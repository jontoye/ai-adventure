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
  console.log(req.query.id);

  Adventure.findOne({_id: req.query.id})
  .then((adventure) => {
    console.log("Found Adventure: ", adventure.name);

    adventure.events.forEach(e=>{
      console.log("Deleting Event: ", e);
      Event.deleteOne({_id: e})
      .then((info)=>{
        console.log(info)
        console.log('Successfully deleted event.')
      })
      .catch((err) => {
        console.log(err);
        res.send("Error deleting events.");
      });
    }) 

    Adventure.deleteOne({_id: adventure.id})
    .then((info)=>{
      console.log('Successfully deleted adventure: ' + adventure.name)
      res.json({info});
    })
    .catch((err)=>{console.log(err); res.send("Error deleting selected adventure.")})
  })
  .catch((err) => {
    console.log(err);
    res.send("Error locating adventures.");
  });


}

//HTTP PUT - Adventure Update
exports.adventure_update_put = (req,res) => {
  Adventure.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then((adventure)=>{
      res.json({adventure});
  })
  .catch((err)=>{console.log(err); res.send("Error updating adventure.")})
}