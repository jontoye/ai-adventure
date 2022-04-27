const Feedback = require("../models/Feedback");

exports.feedback_create_post = (req, res) => {
  let feedback = new Feedback(req.body);

  //save feedback
  feedback.save()
  .then((feedback) => {
    res.json({ feedback });
  })
  .catch((err) => {
    console.log(err);
    res.status(418).json({ error: err });
  });
};