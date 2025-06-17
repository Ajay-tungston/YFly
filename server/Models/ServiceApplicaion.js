const mongoose = require("mongoose");

const serviceApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
service:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Service",
    required:true
}
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("ServiceApplication", serviceApplicationSchema);

