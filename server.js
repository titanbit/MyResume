const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3232;
const { DBURL } = require("./databaseConfig/dbConfig");

//App Init
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log("Database Connection Error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ title: "this is the simple route of our application." });
});

//require resume route
require("./app/routes/resume.route")(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
