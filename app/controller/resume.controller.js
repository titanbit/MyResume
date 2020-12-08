const Resume = require("../models/resume.model");

class MyResume {
  constructor(name, email, phone, location, skills, experience) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.skills = skills;
    this.experience = experience;
  }
}

exports.create = async (req, res) => {
  try {
    if (req.body == false) {
      return res.send({ message: "Form data can not be empty." });
    }

    const { name, email, phone, location, skills, experience } = req.body;
    const newResume = new Resume(
      new MyResume(name, email, phone, location, skills, experience)
    );
    //save newResume in database
    const savedResume = await newResume.save();
    res.send({ id: savedResume._id, status: res.statusCode });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Resume.",
    });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id });
    if (resume) {
      return res.send({ message: "Resume found.", resume });
    }
    return res.send({ message: "Resume not  found." });
  } catch (error) {
    return res.send({
      message: `No resume found with id ${req.params.id}`,
    });
  }
};

exports.deleteResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOneAndRemove({ _id: req.params.id });
    if (!resume) {
      return res.send({
        message: `No resume found with id ${req.params.id}`,
        status: false,
      });
    } else {
      return res.send({ message: "Resume deleted.", status: true });
    }
  } catch (error) {
    return res.send({
      message: `No resume found with id ${req.params.id}`,
      status: false,
    });
  }
};

exports.updateResumeById = async (req, res) => {
  try {
    if (req.body == false) {
      return res.send({ message: "Form data can not be empty." });
    }
    const { name, email, phone, location, skills, experience } = req.body;
    const updatedResume = new MyResume(
      name,
      email,
      phone,
      location,
      skills,
      experience
    );
    const result = await Resume.findByIdAndUpdate(
      req.params.id,
      updatedResume,
      { new: true }
    );
    if (!result) {
      return res.send({
        message: `No resume found with id ${req.params.id}`,
        status: false,
      });
    }
    return res.send({ message: "Updated Successfully.", status: true });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        message: "Resume not found with id " + req.params.id,
      });
    }
    return res.status(500).send({
      message: "Error updating Resume with id " + req.params.id,
    });
  }
};
