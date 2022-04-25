const Character = require("../models/Character");

exports.character_create_post = (req, res) => {
    console.log("REQ.BODY --->", req.body);
    let character = new Character(req.body);

    //save character
    character
        .save()
        .then((character) => {
            res.json({ character });
        })
        .catch((err) => {
            console.log(err);
            // res.send("Error 418");
            res.status(418).json({ error: err });
        });
};

//HTTP GET - Character index
exports.character_index_get = (req, res) => {
    Character.find()
        .then((characters) => {
            res.json({ characters });
        })
        .catch((err) => {
            console.log(err);
            res.send("Error locating Characters.");
        });
};
