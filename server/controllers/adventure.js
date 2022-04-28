const Adventure = require("../models/Adventure");
const Event = require("../models/Event");
const User = require("../models/User");
const moment = require("moment");

exports.adventure_create_post = (req, res) => {
  console.log("USER CREATED ADVENTURE", req.user);
  let adventure = new Adventure(req.body);

  //save adventure
  adventure
    .save()
    .then((adventure) => {
      User.findById(req.user).then((user) => {
        user.activity.push(
          `Started adventure '${adventure.name}' on ${moment().format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}`
        );
        user.save().then(() => {
          res.json({ adventure });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("CREATE ADVENTURE ERROR", err);
    });
};

//HTTP GET
exports.adventure_index_get = (req, res) => {
  Adventure.find()
    .then((adventures) => {
      res.json({ adventures }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error locating adventures.");
    });
};

//HTTP DELETE - Adventure
exports.adventure_delete_get = (req, res) => {
  //STEP ONE: FIND THE ADVENTURE DATA
  Adventure.findOne({ _id: req.query.id })
    .then((adventure) => {
      // console.log("Found Adventure: ", adventure.name);
      //STEP TWO: DELETE THE EVENTS WITHIN THE ADVENTURE
      adventure.events.forEach((e) => {
        Event.deleteOne({ _id: e })
          .then((info) => {
            // console.log('Successfully deleted event: ', e)
          })
          .catch((err) => {
            console.log(err);
            res.send("Error deleting events.");
          });
      });
      //STEP THREE: DELETE THE ADVENTURE
      Adventure.deleteOne({ _id: adventure.id })
        .then((info) => {
          // console.log('Successfully deleted adventure: ' + adventure.name)
          res.json({ info }).status(200);
        })
        .catch((err) => {
          console.log(err);
          res.send("Error deleting selected adventure.");
        });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error locating adventures.");
    });
};

//HTTP PUT - Adventure Update
exports.adventure_update_put = (req, res) => {
  Adventure.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((adventure) => {
      res.json({ adventure }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error updating adventure.");
    });
};
