const University = require("../Models/University");
const fs = require("fs");


const normalizeUniversityName = (name) => {
    return name.trim().replace(/\s+/g, " "); // Trim and remove extra spaces
};

// Create a new university
const createUniversity = async (req, res) => {
    try {
        const { university_name, university_ranking, state, country, university_type } = req.fields;
        const university_logo = req.files ? req.files.university_logo : null;

        // Validate required fields
        if (!university_name || !university_ranking || !state || !country || !university_type) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        if (!university_logo) {
            return res.status(400).json({ error: "University logo is required." });
        }

        // Validate ranking as a number
        if (isNaN(university_ranking) || university_ranking <= 0) {
            return res.status(400).json({ error: "University ranking must be a positive number." });
        }

        // Validate university type
        if (!["Public", "Private"].includes(university_type)) {
            return res.status(400).json({ error: "Invalid university type. Must be Public or Private." });
        }

        // Normalize the university name
        const formattedUniversityName = normalizeUniversityName(university_name);

        // **Check for existing university (case-insensitive)**
        const existingUniversity = await University.findOne({ 
            university_name: { $regex: new RegExp(`^${university_name}$`, "i") } 
        });
        if (existingUniversity) {
            return res.status(400).json({ error: "University with this name already exists." });
        }

        // Validate and process university logo
        if (!['image/jpeg', 'image/png'].includes(university_logo.type)) {
            return res.status(400).json({ error: "University logo must be a JPEG or PNG image." });
        }
        if (university_logo.size > 5000000) {
            return res.status(400).json({ error: "University logo size must be less than 5MB." });
        }
        if (!fs.existsSync(university_logo.path)) {
            return res.status(400).json({ error: "Uploaded university logo file does not exist." });
        }

        // **Read and store the logo**
        const universityLogoData = {
            data: fs.readFileSync(university_logo.path),
            contentType: university_logo.type,
        };

        fs.unlinkSync(university_logo.path);

        // Create a new university
        const university = new University({
            university_name:formattedUniversityName,
            university_ranking,
            state,
            country,
            university_type,
            university_logo: universityLogoData,
        });

        await university.save();
        res.status(201).json({ success: true, message: "University created successfully.", university });
    } catch (error) {
        console.error("Error creating university:", error.message);
        res.status(500).json({ error: error.message || "Internal server error." });
    }
};

//for slelect box selection 
const getAllUniversity=async(req,res)=>{
    try {
        const university=await University.find().select("university_name")
        if(!university){
            return res.status(404).json({ error: "No universities found." });
        }
        res.status(200).json({ university });
    } catch (error) {
        console.error("Error getting all universities:", error.message);
        res.status(500).json({ error: error.message || "Internal server error." });
    }
}
module.exports={createUniversity,getAllUniversity}
