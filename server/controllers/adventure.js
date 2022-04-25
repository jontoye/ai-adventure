const Adventure = require("../models/Adventure");

exports.adventure_create_post = (req, res) => {
  let adventure = new Adventure(req.body);

  //save adventure
  adventure.save()
  .then((adventure) => {
    res.json({ adventure });
  })
  .catch((err) => {
    console.log(err);
    res.send("Error 418");
  });
};

//HTTP GET 
exports.adventure_index_get = (req, res) => {
  Adventure.find()
  .then((adventures) => {
    res.json({ adventures });
  })
  .catch((err) => {
    console.log(err);
    res.send("Error locating adventures.");
  });
}