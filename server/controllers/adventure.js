const Adventure = require("../models/Adventure");
const Event = require("../models/Event");
const User = require("../models/User");
const moment = require("moment");

exports.adventure_create_post = (req, res) => {

  let newAdventure = new Adventure(req.body);

  //save adventure
  newAdventure.save()
  .then((savedAdventure)=>{
    Adventure.findById(savedAdventure.id)
    .populate("character")
    .then((adventure) => {
      User.findById(req.user).then((user) => {
        user.activity.push(
          `${adventure.character.name} started adventure '${
            adventure.name
          }' on ${moment().format("MMMM Do YYYY, h:mm a")}`
        );
        user.save().then(() => {
          res.json({ adventure }).status(200);
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({error: err, message: "Error creating adventure."}).status(400);
    });
  })
  .catch((err) => {
    console.log(err);
    res.json({error: err, message: "Error creating adventure."}).status(400);
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
      res.json({error: err, message: "Error fetching adventures."}).status(400);
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
        res.json({error: err, message: "Error deleting events."}).status(400);
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
      res.json({error: err, message: "Error deleting adventure."}).status(400);
    });
  })
  .catch((err) => {
    console.log(err);
    res.json({error: err, message: "Error fetching adventures."}).status(400);
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
      res.json({error: err, message: "Error updating adventure."}).status(400);
    });
};
