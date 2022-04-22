const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// initialise session/cookies
let session = require("express-session");
let passport = require("./helper/ppConfig");

app.use(
    session({
        secret: process.env.secret,
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
const characterRoute = require("./routes/characters")
//Mount routes
app.get("/", (req, res, next) => {
    res.redirect("/home");
});
app.use("/", adventureRoute);
app.use("/", eventRoute);
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", characterRoute);

mongoose.connect(
    process.env.mongoDBURL,
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
