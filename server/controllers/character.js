const { Character } = require("../models/Character");

exports.character_create_post = (req, res) => {
  let character = new Character(req.body);

  //save character
  character
    .save()
    .then((character) => {
      res.json({ character });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error 418");
    });
};
