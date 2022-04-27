const Adventure = require("../models/Adventure");
const Event = require("../models/Event");

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

//HTTP DELETE - Adventure
exports.adventure_delete_get = (req,res) => {
  // console.log("Deleting " + req.query.name);
  // Event.deleteMany()

  Adventure.deleteOne({name: req.query.name})
  .then((adventure)=>{
    res.json({adventure});
  })
  .catch((err)=>{console.log(err); res.send("Error deleting selected adventure.")})
}

//HTTP PUT - Adventure Update
exports.adventure_update_put = (req,res) => {
  Adventure.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then((adventure)=>{
      res.json({adventure});
  })
  .catch((err)=>{console.log(err); res.send("Error updating adventure.")})
}