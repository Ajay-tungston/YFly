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
    } = req.query;

    // Build university filter
    let matchStage = {};
    if (country) matchStage.country = country;
    if (university_name)
      matchStage.university_name = { $regex: university_name, $options: "i" };

    // Aggregation pipeline
    const pipeline = [
      { $match: matchStage }, // Apply university filters
      {
        $lookup: {
          from: "courses", // Course collection
          localField: "courses",
          foreignField: "_id",
          as: "courses",
        },
      },
      // Only filter courses if a filter is provided
      {
        $addFields: {
          courses: {
            $cond: {
              if: {
                $or: [
                  course_level,
                  area_of_study,
                  intake_month,
                  intake_year,
                  min_tution_fee,
                  max_tution_fee,
                  course_duration,
                ],
              }, // Apply filter only if any filter exists
              then: {
                $filter: {
                  input: "$courses",
                  as: "course",
                  cond: {
                    $and: [
                      course_level
                        ? { $eq: ["$$course.course_level", course_level] }
                        : { $const: true },
                      area_of_study
                        ? { $eq: ["$$course.area_of_study", area_of_study] }
                        : { $const: true },
                      min_tution_fee
                        ? {
                            $gte: [
                              "$$course.tution_fee",
                              parseInt(min_tution_fee),
                            ],
                          }
                        : { $const: true },
                      max_tution_fee
                        ? {
                            $lte: [
                              "$$course.tution_fee",
                              parseInt(max_tution_fee),
                            ],
                          }
                        : { $const: true },
                      course_duration
                        ? { $eq: ["$$course.course_duration", course_duration] }
                        : { $const: true },
                      intake_month
                        ? { $in: [intake_month, "$$course.intakes.month"] }
                        : { $const: true },
                      intake_year
                        ? {
                            $in: [
                              parseInt(intake_year),
                              "$$course.intakes.year",
                            ],
                          }
                        : { $const: true },
                    ],
                  },
                },
              },
              else: "$courses", // Keep all courses if no filter is applied
            },
          },
        },
      },
      // Remove universities where 'courses' array is empty
      { $match: { "courses.0": { $exists: true } } },

      {
        $addFields: {
          category: {
            $switch: {
              branches: [
                { case: { $lte: ["$university_ranking", 50] }, then: "Ascend" },
                {
                  case: {
                    $and: [
                      { $gt: ["$university_ranking", 50] },
                      { $lte: ["$university_ranking", 100] },
                    ],
                  },
                  then: "Contender",
                },
                {
                  // case: {
                  //   $and: [
                  //     { $gt: ["$university_ranking", 100] },
                  //     { $lte: ["$university_ranking", 200] },
                  //   ],
                  // },
                  case: { $gt: ["$university_ranking", 100] },
                  then: "Frontrunner",
                },
              ],
              default: null,
            },
          },
        },
      },
      { $match: { category: { $ne: null } } }, // Remove universities with no category
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
              courses: "$courses", // Include filtered courses
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
      {
        $group: {
          _id: null,
          course_levels: { $addToSet: "$course_level" },
          disciplines: { $addToSet: "$discipline" },
          areas_of_study: { $addToSet: "$area_of_study" },
          course_durations: { $addToSet: "$course_duration" },
          intakes: {
            $addToSet: { month: "$intakes.month", year: "$intakes.year" },
          },
          min_tuition_fee: { $min: "$tution_fee" }, // Fetch minimum tuition fee
          max_tuition_fee: { $max: "$tution_fee" },
          // country: { $addToSet: "$country" },
        },
      },
      {
        $addFields: {
          intakes: {
            $sortArray: {
              input: "$intakes",
              sortBy: { year: 1, month: 1 }, // Sort by year first, then month
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);
    const countries = await University.distinct("country");
    res.status(200).json({
      success: true,
      filters: filters.length > 0 ? { ...filters[0], country: countries } : { country: countries },
    });
  } catch (error) {
    console.error("Error fetching course filters:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

module.exports = { profileMatcher, getProfileMatcherFilters };
