const Feedback = require("../models/Feedback");

exports.feedback_create_post = (req, res) => {
  let feedback = new Feedback(req.body);

  //save feedback
  feedback.save()
  .then((result) => {
    res.json({ result });
  })
  .catch((err) => {
    console.log(err);
    res.json({ error: err }).status(418);
  });
};