const Adventure = require("../models/Adventure");
const Achievement = require("../models/Achievement")
const Event = require("../models/Event");
const User = require("../models/User");
const moment = require("moment");


exports.achievement_create_post = (req, res) => {
  // console.log("REQ.BODY --->", req.body);
  let achievement = new Achievement(req.body);

  //save character
  character
    .save()
    .then((character) => {
      User.findById(req.user).then((user) => {
        user.activity.push(
          `Created ${character.name} on ${moment().format(
            "MMMM Do YYYY, h:mm a"
          )}`
        );
        user.save().then(() => {
          res.json({ character }).status(200);
        });
      });
    })
    .catch((err) => {
      console.log(err);
      // res.send("Error 418");
      res
        .json({ error: err, message: "Error creating Character." })
        .status(400);
    });
};