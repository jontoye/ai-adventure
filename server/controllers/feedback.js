const Feedback = require("../models/Feedback");

exports.feedback_create_post = (req, res) => {
  let feedback = new Feedback(req.body);

  //save feedback
  feedback
    .save()
    .then((result) => {
      res.json({ result }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err, message: "Error sending feedback to developers." }).status(400);
    });
};

exports.feedback_index_get = (req, res) => {
  Feedback.find()
    .then((results) => {
      res.json({ feedback: results }).status(200);
    })
    .catch((err) => {
      res.json({ error: err, message: "Error fetching feedback." }).status(400);
    });
};
