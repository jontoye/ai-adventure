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

//HTTP GET - load stock detail
exports.event_detail_get = (req, res) => {
    return
}

