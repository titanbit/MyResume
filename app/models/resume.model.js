const mongoose = require("mongoose");

const ResumeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    location: { type: String },
    skills: [],
    experience: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeList", ResumeSchema);
