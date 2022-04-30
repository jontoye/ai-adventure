const Event = require("../models/Event");

exports.event_create_post = (req, res) => {
  let event = new Event(req.body);

  //save adventure
  event.save()
  .then((event) => {
    res.json({ event }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.json({error: err, message: "Error creating event."}).status(400);
  });
};

//HTTP GET - load event index
exports.event_index_get = (req, res) => {
  Event.find()
  .then((events) => {
    res.json({ events }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.json({error: err, message: "Error fetching events."}).status(400);
  });
}

//HTTP PUT - Event Update
exports.event_update_put = (req,res) => {
  Event.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then((event)=>{
      res.json({event}).status(200);
  })
  .catch((err)=>{
    console.log(err); 
    res.json({error: err, message: "Error updating event."}).status(400);
  })
}

