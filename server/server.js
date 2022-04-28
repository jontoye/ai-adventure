const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");

const PORT = process.env.PORT || 3001;

// initialise session/cookies
let session = require("express-session");
let passport = require("./helper/ppConfig");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, "build")));

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false, //don't resave if cookie is modified
    cookie: { maxAge: 3600000 }, //milliseconds until cookie timeout (1hr)
  })
);
//must go before routes
app.use(passport.initialize());
app.use(passport.session());

// Share session information with all pages
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  // res.locals.alerts = req.flash();
  next(); //next is from the express framework
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! " });
});

//Import Routes
const adventureRoute = require("./routes/adventure");
const eventRoute = require("./routes/event");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const characterRoute = require("./routes/character");
const feedbackRoute = require("./routes/feedback");
//Mount routes
app.get("/", (req, res, next) => {
  res.redirect("/home");
});
app.use("/", adventureRoute);
app.use("/", eventRoute);
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", characterRoute);
app.use("/", feedbackRoute);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose.connect(
  process.env.MONGODBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongodb connected successfully!");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
