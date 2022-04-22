const { Character } = require("../models/Character");

exports.character_create_post = (req, res) => {
  let character = new Character(req.body);
  console.log("new character test", character);

  //save character
  character
    .save() //if this is true, .then line is executed
    .then((character) => {
      res.json({ character });
    })
    .catch(() => {
      console.log(err);
      res.send("Error 418");
    });
};
