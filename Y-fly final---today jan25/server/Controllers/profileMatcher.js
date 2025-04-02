const courseSchema = require("../Models/courseSchema");
const University = require("../Models/University");



const profileMatcher = async (req, res) => {
  try {
    const {
      country, 
      university_name,
      course_level, 
      area_of_study,
      intake_month,
      intake_year,
      min_tution_fee,
      max_tution_fee,
      course_duration,
      test_requirement, 
      min_score, 
      max_score,
      scholarship, 
      minGPA,   // minGPA range start
      maxGPA,   // maxGPA range end
    } = req.query;


    // Convert single values to arrays
    let countryFilter = country ? (Array.isArray(country) ? country : [country]) : [];
    let areaOfStudyFilter = area_of_study ? (Array.isArray(area_of_study) ? area_of_study : [area_of_study]) : [];
    let intakeMonthFilter = intake_month ? (Array.isArray(intake_month) ? intake_month : [intake_month]) : [];
    let intakeYearFilter = intake_year ? (Array.isArray(intake_year) ? intake_year.map(Number) : [Number(intake_year)]) : [];
    let scholarshipFilter = scholarship ? (Array.isArray(scholarship) ? scholarship : [scholarship]) : [];
    let courseDurationFilter = course_duration ? (Array.isArray(course_duration) ? course_duration : [course_duration]) : [];

    // University Match Stage
    let matchStage = {};
    if (countryFilter.length) matchStage.country = { $in: countryFilter };
    if (university_name) matchStage.university_name = { $regex: university_name, $options: "i" };

    // Aggregation Pipeline
    const pipeline = [
      { $match: matchStage }, 
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courses",
        },
      },
      {
        $addFields: {
          courses: {
            $filter: {
              input: "$courses",
              as: "course",
              cond: {
                $and: [
                  course_level ? { $eq: ["$$course.course_level", course_level] } : { $const: true },
                  areaOfStudyFilter.length ? { $in: ["$$course.area_of_study", areaOfStudyFilter] } : { $const: true },
                  min_tution_fee ? { $gte: ["$$course.tution_fee", parseInt(min_tution_fee)] } : { $const: true },
                  max_tution_fee ? { $lte: ["$$course.tution_fee", parseInt(max_tution_fee)] } : { $const: true },
                  courseDurationFilter.length ? { $in: ["$$course.course_duration", courseDurationFilter] } : { $const: true },
                  test_requirement
                    ? {
                        $gt: [
                          {
                            $size: {
                              $filter: {
                                input: "$$course.testRequirements",
                                as: "test",
                                cond: {
                                  $and: [
                                    { $eq: ["$$test.testRequirementName", test_requirement] },
                                    min_score ? { $gte: [{ $toDouble: "$$test.overallScore" }, parseFloat(min_score)] } : { $const: true },
                                    max_score ? { $lte: [{ $toDouble: "$$test.overallScore" }, parseFloat(max_score)] } : { $const: true },
                                  ],
                                },
                              },
                            },
                          },
                          0,
                        ],
                      }
                    : { $const: true },
                  scholarshipFilter.length ? { $gt: [{ $size: { $setIntersection: ["$$course.scholarship_applicable", scholarshipFilter] } }, 0] } : { $const: true },
                  
                  // ✅ Fixed Intake Filtering
                  intakeMonthFilter.length && intakeYearFilter.length
                    ? {
                        $gt: [
                          {
                            $size: {
                              $filter: {
                                input: "$$course.intakes",
                                as: "intake",
                                cond: {
                                  $or: intakeMonthFilter.map((month, index) => ({
                                    $and: [
                                      { $eq: ["$$intake.month", month] },
                                      { $eq: ["$$intake.year", intakeYearFilter[index]] },
                                    ],
                                  })),
                                },
                              },
                            },
                          },
                          0,
                        ],
                      }
                    : { $const: true },

                  // ✅ GPA Filtering Logic with the user range (minGPA, maxGPA)
                  minGPA && maxGPA
                    ? {
                        $and: [
                          { 
                            $gte: [
                              { $arrayElemAt: ["$$course.eligibilityRequirements.minGPA", 0] }, // Access minGPA in eligibilityRequirements array
                              parseFloat(minGPA)
                            ] 
                          },
                          { 
                            $lte: [
                              { $arrayElemAt: ["$$course.eligibilityRequirements.minGPA", 0] }, 
                              parseFloat(maxGPA)
                            ]
                          },
                        ],
                      }
                    : { $const: true },
                ],
              },
            },
          },
        },
      },
      { $match: { "courses.0": { $exists: true } } }, 
      {
        $addFields: {
          category: {
            $switch: {
              branches: [
                { case: { $lte: ["$university_ranking", 50] }, then: "Ascend" },
                {
                  case: { $and: [{ $gt: ["$university_ranking", 50] }, { $lte: ["$university_ranking", 100] }] },
                  then: "Contender",
                },
                { case: { $gt: ["$university_ranking", 100] }, then: "Frontrunner" },
              ],
              default: null,
            },
          },
        },
      },
      { $match: { category: { $ne: null } } },
      {
        $group: {
          _id: "$category",
          universities: {
            $push: {
              university_name: "$university_name",
              university_logo: "$university_logo",
              university_ranking: "$university_ranking",
              country: "$country",
              state: "$state",
              university_type: "$university_type",
              courses: "$courses",
            },
          },
          count: { $sum: 1 },
        },
      },
    ];

    const results = await University.aggregate(pipeline);

    // Prepare structured response
    const data = {
      Ascend: { count: 0, universities: [] },
      Contender: { count: 0, universities: [] },
      Frontrunner: { count: 0, universities: [] },
    };

    results.forEach((group) => {
      data[group._id] = {
        count: group.count,
        universities: group.universities,
      };
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in profileMatcher:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


const getProfileMatcherFilters = async (req, res) => {
  try {
    const filters = await courseSchema.aggregate([
      { $unwind: "$intakes" },
      { $unwind: { path: "$testRequirements", preserveNullAndEmptyArrays: true } },

      {
        $group: {
          _id: null,
          course_levels: { $addToSet: "$course_level" },
          disciplines: { $addToSet: "$discipline" },
          areas_of_study: { $addToSet: "$area_of_study" },
          course_durations: { $addToSet: "$course_duration" },
          scholarships: { $addToSet: "$scholarship_applicable" }, 
          intakes: {
            $addToSet: { month: "$intakes.month", year: "$intakes.year" },
          },
          min_tuition_fee: { $min: "$tution_fee" },
          max_tuition_fee: { $max: "$tution_fee" },
          test_requirements: { $addToSet: "$testRequirements.testRequirementName" },
        },
      },

      // Flatten scholarship array to remove potential nested arrays
      {
        $addFields: {
          scholarships: {
            $reduce: {
              input: "$scholarships",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] }, // Ensures unique scholarship values
            },
          },
        },
      },

      {
        $lookup: {
          from: "courses",
          pipeline: [
            { $unwind: "$testRequirements" },
            {
              $group: {
                _id: "$testRequirements.testRequirementName",
                max_overall_score: { $max: { $toDouble: "$testRequirements.overallScore" } },
              },
            },
          ],
          as: "test_requirements_max_scores",
        },
      },

      {
        $addFields: {
          intakes: {
            $sortArray: {
              input: "$intakes",
              sortBy: { year: 1, month: 1 },
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);

    const countries = await University.distinct("country");

    res.status(200).json({
      success: true,
      filters: filters.length > 0
        ? { ...filters[0], country: countries }
        : { country: countries },
    });
  } catch (error) {
    console.error("Error fetching course filters:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};



module.exports = { profileMatcher, getProfileMatcherFilters };
