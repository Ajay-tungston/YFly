const path = require("path");
const Service = require("../Models/Services");
const fs = require('fs');

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
          benefits = typeof req.fields.benefits === 'string' 
            ? req.fields.benefits.split(',') 
            : [req.fields.benefits];
        }
      }
      
      // Ensure benefits is always an array and clean empty values
      benefits = Array.isArray(benefits) 
        ? benefits.map(b => b.trim()).filter(b => b) 
        : [benefits].filter(Boolean);
  
      console.log('Processed benefits:', benefits);
  
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
            benefits: benefits.length === 0 ? "At least one benefit is required" : undefined,
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
      newService
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
    const services = await Service.find().select("service_name service_image").lean();
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Transform services to include full image URLs
    const servicesWithImageUrls = services.map(service => {
      // If service_image is just a path string
      if (typeof service.service_image === 'string') {
        return {
          service_name: service.service_name,
          imageUrl: `${baseUrl}/${service.service_image.replace(/^\.\/uploads\//, '')}`
        };
      }
      // If service_image is an object with path property
      if (service.service_image?.path) {
        return {
          service_name: service.service_name,
          imageUrl: `${baseUrl}/${service.service_image.path.replace(/^\.\/uploads\//, '')}`
        };
      }
      // If no image found
      return {
        service_name: service.service_name,
        imageUrl: null
      };
    });

    res.status(200).json({
      success: true,
      data: servicesWithImageUrls
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

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    if (search) {
      query.service_name = { $regex: search, $options: "i" };
    }

    // Get services with pagination
    const services = await Service.find(query)
      // .select("service_name price overview category is_available")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

      const servicesWithImageUrls = services.map(service => {
        // If service_image is just a path (old format)
        if (typeof service.service_image === 'string') {
          return {
            ...service,
            imageUrl: `${baseUrl}/${service.service_image.replace(/^\.\/uploads\//, '')}`
          };
        }
        // If service_image is an object (new format with path)
        if (service.service_image?.path) {
          return {
            ...service,
            imageUrl: `${baseUrl}/${service.service_image.path.replace(/^\.\/uploads\//, '')}`
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
    res.json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  addNewService,
  getAllServiceName,
  getAllServiceWithPagination,
  getServiceById,
};
