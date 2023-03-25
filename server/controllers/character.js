const Character = require("../models/Character");
const User = require("../models/User");
const moment = require("moment");

exports.character_create_post = (req, res) => {
  console.log("create char REQ.BODY --->", req.body, req.user);
  let character = new Character(req.body);

  //save character
  character
    .save()
    .then((character) => {
      User.findById(req.user).then((user) => {
        // console.log("user test", req.user, user);
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

//HTTP GET - Character index
exports.character_index_get = (req, res) => {
  Character.find()
    .then((characters) => {
      res.json({ characters }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res
        .json({ error: err, message: "Error locating Characters." })
        .status(400);
    });
};

//HTTP DELETE - Character
exports.character_delete_get = (req, res) => {
  // console.log("Deleting " + req.query.name);
  Character.deleteOne({ name: req.query.name })
    .then((character) => {
      res.json({ character }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res
        .json({ error: err, message: "Error deleting selected character." })
        .status(400);
    });
};
