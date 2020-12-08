module.exports = (app) => {
  const Resume = require("../controller/resume.controller");
  //create resume route
  app.post("/resume", Resume.create);

  //get resume route
  app.get("/resume/:id", Resume.getResumeById);

  //delete resume route
  app.delete("/resume/:id", Resume.deleteResumeById);

  //update resume route
  app.put("/resume/:id", Resume.updateResumeById);
};
