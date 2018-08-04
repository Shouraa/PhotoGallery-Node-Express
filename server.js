const express = require("express");
const { studentInfo } = require("./studentInfo");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// app.use(bodyParser.json());

//index page
app.get("/", (req, res) => {
  res.render("pages/index", { studentInfo });
});

app.get("/delete/:index", (req, res) => {
  studentInfo.splice(req.params.index, 1);
  res.render("pages/index", { studentInfo });
});

//detail page
app.get("/detail/:index", (req, res) => {
  res.render("pages/detail", { student: studentInfo[req.params.index] });
});

//add new student page
app.get("/addStudent", (req, res) => {
  res.render("pages/addStudent");
});

app.post("/addConfirm", (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  let pic = req.body.firstName + ".jpg";

  req.files.studentPicture.mv(__dirname + "/assets/images/" + pic, err => {
    if (err) return res.status(500).send(err);
  });
  const student = req.body;

  student.src = pic;
  student.alt = req.body.firstName;
  student.skills = req.body.skills.split(",");
  console.log(student);
  studentInfo.unshift(student);

  res.redirect("/");
});

app.listen(3001);
console.log("3000 is the server");
