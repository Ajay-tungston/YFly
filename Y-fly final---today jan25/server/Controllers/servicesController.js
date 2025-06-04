const path = require("path");
const Service = require("../Models/Services");
const User = require("../Models/userSchema");
const ServiceApplication = require("../Models/ServiceApplicaion");
const fs = require("fs");
const ServiceApplicaion = require("../Models/ServiceApplicaion");

const xlsx = require("xlsx");


const addNewService = async (req, res) => {
  try {
    // Extract fields from req.fields
    const { service_name, price, overview, procedure, workflow } = req.fields;

    // Parse benefits field safely
    let benefits = [];
    if (req.fields.benefits) {
      try {
        // Try parsing as JSON first (if sent as stringified array)
        benefits = JSON.parse(req.fields.benefits);
      } catch (e) {
        // If not JSON, handle as string (could be comma-separated)
        benefits =
          typeof req.fields.benefits === "string"
            ? req.fields.benefits.split(",")
            : [req.fields.benefits];
      }
    }

    // Ensure benefits is always an array and clean empty values
    benefits = Array.isArray(benefits)
      ? benefits.map((b) => b.trim()).filter((b) => b)
      : [benefits].filter(Boolean);


    // Get the uploaded image file
    const serviceImage = req.files?.service_image;

    // Basic required field check (updated benefits check)
    if (
      !service_name ||
      !price ||
      !overview ||
      benefits.length === 0 || // Check if any benefits exist
      !procedure ||
      !workflow
    ) {
      if (serviceImage) {
        fs.unlinkSync(serviceImage.path);
      }
      return res.status(400).json({
        message: "Validation Error",
        errors: {
          service_name: !service_name ? "Service name is required" : undefined,
          price: !price ? "Price is required" : undefined,
          overview: !overview ? "Overview is required" : undefined,
          benefits:
            benefits.length === 0
              ? "At least one benefit is required"
              : undefined,
          procedure: !procedure ? "Procedure is required" : undefined,
          workflow: !workflow ? "Workflow steps are required" : undefined,
        },
      });
    }

    // Check if image was uploaded
    if (!serviceImage) {
      return res.status(400).json({
        message: "Validation Error",
        errors: {
          service_image: "Service image is required",
        },
      });
    }

    // Check for duplicate service
    const duplicate = await Service.findOne({ service_name });
    if (duplicate) {
      fs.unlinkSync(serviceImage.path);
      return res.status(409).json({ message: "Service already exists" });
    }

    // Create and save the service with image path
    const newService = new Service({
      service_name,
      price,
      overview,
      benefits: Array.isArray(benefits) ? benefits : [benefits],
      procedure,
      workflow,
      service_image: serviceImage.path, // Save the file path
    });

    await newService.save();

    res.status(201).json({
      message: "Service created successfully",
      newService,
    });
  } catch (error) {
    console.error("Error:", error);

    // Clean up uploaded file if error occurs
    if (req.files?.service_image) {
      fs.unlinkSync(req.files.service_image.path);
    }

    // Handle formidable file size error
    if (error.code === "ETOOBIG") {
      return res.status(400).json({
        message: "Validation Error",
        errors: {
          service_image: "File size too large (max 5MB)",
        },
      });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        switch (error.errors[field].kind) {
          case "required":
            errors[field] = `Please provide a ${field.replace("_", " ")}.`;
            break;
          case "min":
            errors[field] = `${field.replace("_", " ")} must be at least ${
              error.errors[field].properties.min
            }.`;
            break;
          case "enum":
            errors[field] = `Invalid ${field.replace(
              "_",
              " "
            )}. Valid options: ${error.errors[field].properties.enumValues.join(
              ", "
            )}.`;
            break;
          case "Number":
            errors[field] = `${field.replace("_", " ")} must be a number.`;
            break;
          default:
            errors[field] = error.errors[field].message;
        }
      }
      return res.status(400).json({
        message: "Validation Failed: Please check your input",
        errors,
      });
    }

    // Generic server error
    res.status(500).json({
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getAllServiceName = async (req, res) => {
  try {
    const services = await Service.find()
      .select("service_name service_image")
      .lean();
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Transform services to include full image URLs
    const servicesWithImageUrls = services.map((service) => {
      let imagePath;

      if (typeof service.service_image === "string") {
        imagePath = service.service_image;
      } else if (service.service_image?.path) {
        imagePath = service.service_image.path;
      }

      return {
        _id: service._id,
        service_name: service.service_name,
        imageUrl: imagePath
          ? `${baseUrl}/${imagePath.replace(/^\.?\/?uploads\//, "uploads/")}`
          : null,
      };
    });

    res.status(200).json({
      success: true,
      data: servicesWithImageUrls,
    });
  } catch (error) {
    console.error("Error in getAllServiceName:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getAllServiceWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (search) {
      query.service_name = { $regex: search, $options: "i" };
    }

    // Get services with pagination
    const services = await Service.find(query)
      // .select("service_name price overview category is_available")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const servicesWithImageUrls = services.map((service) => {
      // If service_image is just a path (old format)
      if (typeof service.service_image === "string") {
        return {
          ...service,
          imageUrl: `${baseUrl}/${service.service_image.replace(
            /^\.\/uploads\//,
            ""
          )}`,
        };
      }
      // If service_image is an object (new format with path)
      if (service.service_image?.path) {
        return {
          ...service,
          imageUrl: `${baseUrl}/${service.service_image.path.replace(
            /^\.\/uploads\//,
            ""
          )}`,
        };
      }
      return service;
    });
    // Get total count for pagination
    const total = await Service.countDocuments(query);

    res.status(200).json({
      success: true,
      data: servicesWithImageUrls,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error in getAllServiceWithPagination:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id).select("-service_image");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ service }); // 🔧 Wrap service in an object (important!)
  } catch (error) {
    console.error("Error in getServiceById:", error); // ← ADD THIS
    res.status(500).json({
      message: "Server Error",
      error: error.message, // Temporarily send the error message
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the service to update
    const service = await Service.findById(id);
    if (!service) {
      // Remove uploaded file if service not found
      if (req.files?.service_image) {
        fs.unlinkSync(req.files.service_image.path);
      }
      return res.status(404).json({ message: "Service not found" });
    }

    // Merge incoming fields with the existing service data.
    // If a field is not provided, fall back to the existing value.
    const {
      service_name = service.service_name,
      price = service.price,
      overview = service.overview,
      procedure = service.procedure,
      workflow = service.workflow,
      benefits: rawBenefits,
    } = req.fields;

    // Process benefits field: if not provided, use existing benefits.
    let benefits;
    if (rawBenefits !== undefined) {
      try {
        // Attempt to parse as JSON (if sent as a stringified array)
        benefits = JSON.parse(rawBenefits);
      } catch (e) {
        // Otherwise, treat it as a comma-separated string or a single string
        benefits =
          typeof rawBenefits === "string"
            ? rawBenefits.split(",")
            : [rawBenefits];
      }
      // Clean empty values and trim each benefit
      benefits = Array.isArray(benefits)
        ? benefits.map((b) => b.trim()).filter((b) => b)
        : [benefits].filter(Boolean);
    } else {
      benefits = service.benefits; // fallback if not provided
    }

    // After merging, do your validation using the merged values
    if (
      !service_name ||
      !price ||
      !overview ||
      !procedure ||
      !workflow ||
      benefits.length === 0
    ) {
      if (req.files?.service_image) {
        fs.unlinkSync(req.files.service_image.path);
      }
      return res.status(400).json({
        message: "Validation Error",
        errors: {
          service_name: !service_name ? "Service name is required" : undefined,
          price: !price ? "Price is required" : undefined,
          overview: !overview ? "Overview is required" : undefined,
          benefits:
            benefits.length === 0
              ? "At least one benefit is required"
              : undefined,
          procedure: !procedure ? "Procedure is required" : undefined,
          workflow: !workflow ? "Workflow steps are required" : undefined,
        },
      });
    }

    // Check for duplicate service name if it has changed
    if (service_name !== service.service_name) {
      const duplicate = await Service.findOne({ service_name });
      if (duplicate && duplicate._id.toString() !== id) {
        if (req.files?.service_image) {
          fs.unlinkSync(req.files.service_image.path);
        }
        return res.status(409).json({ message: "Service already exists" });
      }
    }

    // If a new image is provided, remove the old image and update the field
    if (req.files?.service_image) {
      if (service.service_image) {
        try {
          fs.unlinkSync(service.service_image);
        } catch (err) {
          console.error("Failed to remove old image:", err);
        }
      }
      service.service_image = req.files.service_image.path;
    }

    // Update service fields with merged values
    service.service_name = service_name;
    service.price = price;
    service.overview = overview;
    service.benefits = benefits;
    service.procedure = procedure;
    service.workflow = workflow;

    // Save the updated service
    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    // Clean up uploaded file if an error occurs
    if (req.files?.service_image) {
      fs.unlinkSync(req.files.service_image.path);
    }

    // Handle file size error
    if (error.code === "ETOOBIG") {
      return res.status(400).json({
        message: "Validation Error",
        errors: {
          service_image: "File size too large (max 5MB)",
        },
      });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        switch (error.errors[field].kind) {
          case "required":
            errors[field] = `Please provide a ${field.replace("_", " ")}.`;
            break;
          case "min":
            errors[field] = `${field.replace("_", " ")} must be at least ${
              error.errors[field].properties.min
            }.`;
            break;
          case "enum":
            errors[field] = `Invalid ${field.replace(
              "_",
              " "
            )}. Valid options: ${error.errors[field].properties.enumValues.join(
              ", "
            )}.`;
            break;
          case "Number":
            errors[field] = `${field.replace("_", " ")} must be a number.`;
            break;
          default:
            errors[field] = error.errors[field].message;
        }
      }
      return res.status(400).json({
        message: "Validation Failed: Please check your input",
        errors,
      });
    }

    // Generic server error
    res.status(500).json({
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the service by ID
    const service = await Service.findById(id);

    // If not found, return 404
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // If there's an image associated, delete it from the file system
    if (service.service_image) {
      try {
        fs.unlinkSync(service.service_image);
      } catch (err) {
        console.error("Failed to delete service image:", err);
      }
    }

    // Delete the service from the database
    await Service.findByIdAndDelete(id);

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const applyForService = async (req, res) => {
  try {
    const { user_email, service_id } = req.fields;
    const user = await User.findOne({ email: user_email });
    const service = await Service.findById(service_id);
    if (!user || !service) {
      return res.status(404).json({ message: "User or service not found" });
    }
    const existingApplication = await ServiceApplication.findOne({
      user: user._id,
      service: service_id,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this service" });
    }
    const newApplication = new ServiceApplication({
      user: user._id,
      service: service_id,
    });
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for service:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getServiceApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = {};

    // Get services with pagination
    const applications = await ServiceApplicaion.find(query)
      .populate("user", "first_name last_name email")
      .populate("service", "service_name price")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await ServiceApplicaion.countDocuments(query);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



const bulkUploadServices = async (req, res) => {
  try {
    const excelFile = req.files?.excel;
    const imageFiles = req.files?.images;

    if (!excelFile || !excelFile.path) {
      return res.status(400).json({ message: "Valid Excel file is required" });
    }

    const workbook = xlsx.readFile(excelFile.path);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Build image map
    const imageMap = {};
    if (imageFiles) {
      if (Array.isArray(imageFiles)) {
        imageFiles.forEach((file) => {
          imageMap[file.name] = file;
        });
      } else if (imageFiles.name) {
        imageMap[imageFiles.name] = imageFiles;
      }
    }

    const createdServices = [];
    const updatedServices = [];
    const errors = [];

    for (const row of rows) {
      try {
        const {
          id, // New custom ID
          service_name,
          price,
          overview,
          benefits,
          procedure,
          workflow,
          image_name,
        } = row;

        // Validation
        if (
          !id ||
          !service_name ||
          !price ||
          !overview ||
          !benefits ||
          !procedure ||
          !workflow ||
          !image_name
        ) {
          errors.push(`Skipping incomplete row (missing required fields): ${service_name || "Unnamed Service"}`);
          continue;
        }

        const imageFile = imageMap[image_name];

        const cleanedBenefits = typeof benefits === "string"
          ? benefits.split(",").map((b) => b.trim()).filter(Boolean)
          : Array.isArray(benefits)
            ? benefits.map((b) => b.trim()).filter(Boolean)
            : [];

        const existingService = await Service.findOne({ id });

        if (existingService) {
          const oldImagePath = existingService.service_image;
          const oldImageName = path.basename(oldImagePath);

          const isImageChanged = image_name !== oldImageName;

          if (isImageChanged && imageFile?.path) {
            const fullOldPath = path.join(__dirname, "..", oldImagePath);

            if (fs.existsSync(fullOldPath)) {
              try {
                fs.unlinkSync(fullOldPath);
              } catch (unlinkErr) {
                console.warn(`Failed to delete old image for ${service_name}: ${unlinkErr.message}`);
              }
            }

            existingService.service_image = imageFile.path;
          }

          existingService.service_name = service_name;
          existingService.price = price;
          existingService.overview = overview;
          existingService.benefits = cleanedBenefits;
          existingService.procedure = procedure;
          existingService.workflow = workflow;

          await existingService.save();
          updatedServices.push(existingService);
        } else {
          if (!imageFile?.path) {
            errors.push(`Image not found for ${service_name}: ${image_name}`);
            continue;
          }

          const newService = new Service({
            id,
            service_name,
            price,
            overview,
            benefits: cleanedBenefits,
            procedure,
            workflow,
            service_image: imageFile.path,
          });

          await newService.save();
          createdServices.push(newService);
        }
      } catch (rowError) {
        errors.push(`Error processing row ${row.service_name || 'unnamed'}: ${rowError.message}`);
      }
    }

    const response = {
      message: `Bulk upload completed.`,
      createdCount: createdServices.length,
      updatedCount: updatedServices.length,
      errorCount: errors.length,
    };

    if (createdServices.length > 0) response.createdServices = createdServices;
    if (updatedServices.length > 0) response.updatedServices = updatedServices;
    if (errors.length > 0) response.errors = errors;

    res.status(createdServices.length > 0 || updatedServices.length > 0 ? 201 : 400).json(response);
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({
      message: "Bulk upload failed",
      errorCount: 1,
      createdCount: 0,
      updatedCount: 0,
      errors: [process.env.NODE_ENV === "development" ? error.message : "An internal error occurred."]
    });
  }
};

module.exports = {
  addNewService,
  getAllServiceName,
  getAllServiceWithPagination,
  getServiceById,
  updateService,
  deleteService,
  applyForService,
  getServiceApplications,
  bulkUploadServices
};
