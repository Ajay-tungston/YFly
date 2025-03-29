const University = require("../Models/University");
const fs = require("fs");

const normalizeUniversityName = (name) => {
  return name.trim().replace(/\s+/g, " "); // Trim and remove extra spaces
};

// Create a new university
const createUniversity = async (req, res) => {
  try {
    const {
      university_name,
      university_ranking,
      state,
      country,
      university_type,
    } = req.fields;
    const university_logo = req.files ? req.files.university_logo : null;

    // Validate required fields
    if (
      !university_name ||
      !university_ranking ||
      !state ||
      !country ||
      !university_type
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    if (!university_logo) {
      return res.status(400).json({ error: "University logo is required." });
    }

    // Validate ranking as a number
    if (isNaN(university_ranking) || university_ranking <= 0) {
      return res
        .status(400)
        .json({ error: "University ranking must be a positive number." });
    }

    // Validate university type
    if (!["Public", "Private"].includes(university_type)) {
      return res
        .status(400)
        .json({ error: "Invalid university type. Must be Public or Private." });
    }

    // Normalize the university name
    const formattedUniversityName = normalizeUniversityName(university_name);

    // **Check for existing university (case-insensitive)**
    const existingUniversity = await University.findOne({
      university_name: { $regex: new RegExp(`^${university_name}$`, "i") },
    });
    if (existingUniversity) {
      return res
        .status(400)
        .json({ error: "University with this name already exists." });
    }

    // Validate and process university logo
    if (!["image/jpeg", "image/png"].includes(university_logo.type)) {
      return res
        .status(400)
        .json({ error: "University logo must be a JPEG or PNG image." });
    }
    if (university_logo.size > 5000000) {
      return res
        .status(400)
        .json({ error: "University logo size must be less than 5MB." });
    }
    if (!fs.existsSync(university_logo.path)) {
      return res
        .status(400)
        .json({ error: "Uploaded university logo file does not exist." });
    }

    // **Read and store the logo**
    const universityLogoData = {
      data: fs.readFileSync(university_logo.path),
      contentType: university_logo.type,
    };

    fs.unlinkSync(university_logo.path);

    // Create a new university
    const university = new University({
      university_name: formattedUniversityName,
      university_ranking,
      state,
      country,
      university_type,
      university_logo: universityLogoData,
    });

    await university.save();
    res
      .status(201)
      .json({
        success: true,
        message: "University created successfully.",
        university,
      });
  } catch (error) {
    console.error("Error creating university:", error.message);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};

//for slelect box selection
const getAllUniversity = async (req, res) => {
  try {
    const university = await University.find().select("university_name");
    if (!university) {
      return res.status(404).json({ error: "No universities found." });
    }
    res.status(200).json({ university });
  } catch (error) {
    console.error("Error getting all universities:", error.message);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};

// for view all universities
const getUniversitiesWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = {};

    // Search filter (university_name, country, or state)
    if (search) {
      query.$or = [
        { university_name: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
      ];
    }

    // Get universities with pagination
    const universities = await University.find(query)
      .select(
        "university_name university_logo university_ranking country state university_type"
      )
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    // Get total count for pagination
    const total = await University.countDocuments(query);

    res.status(200).json({
      success: true,
      data: universities,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error in getAllUniversities:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

const getUniversityById = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "University ID is required.",
        });
      }
  
      const university = await University.findById(id); // Populating courses if needed
  
      if (!university) {
        return res.status(404).json({
          success: false,
          message: "University not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        university,
      });
    } catch (error) {
      console.error("Error fetching university:", error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };
  

  const updateUniversity = async (req, res) => {
    try {
      const { id } = req.params; // Get university ID from params
      console.log(req.fields);
  
      // Fetch existing university
      let university = await University.findById(id);
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
  
      // Extract fields from the request
      const { university_name, university_ranking, state, country, university_type } = req.fields;
      let updateFields = {};
  
      // Check if university name is changing & normalize it
      if (university_name && university_name !== university.university_name) {
        const formattedUniversityName = normalizeUniversityName(university_name);
  
        // Check if another university already has this name
        const existingUniversity = await University.findOne({
          university_name: { $regex: new RegExp(`^${formattedUniversityName}$`, "i") },
          _id: { $ne: id }, // Exclude the current university
        });
  
        if (existingUniversity) {
          return res.status(400).json({ error: "University with this name already exists." });
        }
  
        updateFields.university_name = formattedUniversityName;
      }
  
      if (university_ranking && university_ranking !== university.university_ranking) {
        if (isNaN(university_ranking) || university_ranking <= 0) {
          return res.status(400).json({ error: "University ranking must be a positive number." });
        }
        updateFields.university_ranking = university_ranking;
      }
  
      if (state && state !== university.state) {
        updateFields.state = state;
      }
      if (country && country !== university.country) {
        updateFields.country = country;
      }
  
      if (university_type && university_type !== university.university_type) {
        if (!["Public", "Private"].includes(university_type)) {
          return res.status(400).json({ error: "Invalid university type. Must be Public or Private." });
        }
        updateFields.university_type = university_type;
      }
  
      // Handle university logo upload (if provided)
      if (req.files && req.files.university_logo) {
        const logo = req.files.university_logo;
        
        // Validate file type
        if (!["image/jpeg", "image/png"].includes(logo.type)) {
          return res.status(400).json({ error: "University logo must be a JPEG or PNG image." });
        }
  
        if (logo.size > 5000000) {
          return res.status(400).json({ error: "Logo size must be less than 5MB." });
        }
  
        if (!fs.existsSync(logo.path)) {
          return res.status(400).json({ error: "Uploaded university logo file does not exist." });
        }
  
        updateFields.university_logo = {
          data: fs.readFileSync(logo.path),
          contentType: logo.type,
        };
  
        // Delete the temp file
        fs.unlinkSync(logo.path);
      }
  
      // If no changes detected
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No changes detected" });
      }
  
      // Update the university
      university = await University.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
  
      res.json({ message: "University updated successfully!", university });
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ error: "Server error, please try again later" });
    }
  };


const deleteUniversityById = async (req, res) => {
    try {
      const { id } = req.params; 
  
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "University ID is required.",
        });
      }
  
      // Check if the university has courses
      const university = await University.findById(id);
      if (!university) {
        return res.status(404).json({
          success: false,
          message: "University not found.",
        });
      }
  
      if (university.courses && university.courses.length > 0) {
        return res.status(409).json({
          success: false,
          message: "This university has courses and cannot be deleted.",
        });
      }
  
      // Delete the university if it has no courses
      await University.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        message: "University deleted successfully.",
      });
    } catch (error) {
      console.error("Error in deleteUniversity:", error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };
  

// const profileMatcher = async (req, res) => {
//   try {
//     const { country, university_name } = req.query;

//     // Build match filter
//     let matchStage = {};
//     if (country) matchStage.country = country;
//     if (university_name)
//       matchStage.university_name = { $regex: university_name, $options: "i" };

//     // Aggregation pipeline
//     const pipeline = [
//       { $match: matchStage }, // Apply filters
//       {
//         $lookup: {
//           from: "courses", // Name of the Course collection
//           localField: "courses",
//           foreignField: "_id",
//           as: "courses",
//         },
//       },
//       {
//         $addFields: {
//           category: {
//             $switch: {
//               branches: [
//                 { case: { $lte: ["$university_ranking", 50] }, then: "Ascend" },
//                 {
//                   case: {
//                     $and: [
//                       { $gt: ["$university_ranking", 50] },
//                       { $lte: ["$university_ranking", 100] },
//                     ],
//                   },
//                   then: "Contender",
//                 },
//                 {
//                   case: {
//                     $and: [
//                       { $gt: ["$university_ranking", 100] },
//                       { $lte: ["$university_ranking", 200] },
//                     ],
//                   },
//                   then: "Frontrunner",
//                 },
//               ],
//               default: null, // Ignore universities ranked above 200
//             },
//           },
//         },
//       },
//       { $match: { category: { $ne: null } } }, // Remove universities with no category
//       {
//         $group: {
//           _id: "$category",
//           universities: {
//             $push: {
//               university_name: "$university_name",
//               university_logo: "$university_logo",
//               university_ranking: "$university_ranking",
//               country: "$country",
//               state: "$state",
//               university_type: "$university_type",
//               courses: "$courses",
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//     ];

//     const results = await University.aggregate(pipeline);

//     // Prepare structured response
//     const data = {
//       Ascend: { count: 0, universities: [] },
//       Contender: { count: 0, universities: [] },
//       Frontrunner: { count: 0, universities: [] },
//     };

//     results.forEach((group) => {
//       data[group._id] = {
//         count: group.count,
//         universities: group.universities,
//       };
//     });

//     res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     console.error("Error in profileMatcher:", error);
//     res.status(500).json({ success: false, message: "Server Error", error });
//   }
// };


module.exports = {
  createUniversity,
  getAllUniversity,
  getUniversitiesWithPagination,
  deleteUniversityById,
  getUniversityById,
  updateUniversity
};
