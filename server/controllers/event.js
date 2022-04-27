const Event = require("../models/Event");

exports.event_create_post = (req, res) => {
  let event = new Event(req.body);

  //save adventure
  event.save()
  .then((event) => {
    res.json({ event });
  })
  .catch((err) => {
    console.log(err);
    res.send("Error 418");
  });
};

//HTTP GET - load event index
exports.event_index_get = (req, res) => {
  Event.find()
  .then((events) => {
    res.json({ events });
  })
  .catch((err) => {
    console.log(err);
    res.send("Error locating events.");
  });
}

//HTTP PUT - Event Update
exports.event_update_put = (req,res) => {
  Event.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then((event)=>{
      res.json({event});
  })
  .catch((err)=>{console.log(err); res.send("Error updating event.")})
}

