const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },
    service_name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      unique: true, 
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    service_image: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /\.(jpg|jpeg|png|svg)$/.test(v);
        },
        message: props => `${props.value} is not a valid image URL!`
      }
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    benefits: {
      type: [String],
      default: [],
      validate: {
        validator: (benefits) => benefits.length > 0,
        message: "At least one benefit is required",
      },
    },
    procedure: {
      type: String,
      required: [true, "Procedure description is required"],
    },
    workflow: {
        type: String,
        required: [true, "Workflow description is required"],
    },
    is_available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Service", serviceSchema);