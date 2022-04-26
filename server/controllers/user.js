const User = require("../models/User");
const moment = require("moment");

// HTTP GET - list of all users
exports.user_index_get = (req, res) => {
  User.find()
    .select("-password -emailAddress")
    .then((users) => {
      res.json({ users: users });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

// HTTP GET - user profile - to load the user's profile
exports.user_profile_get = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      res.json({ user: user });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

// HTTP GET - Edit user profile
exports.user_edit_get = (req, res) => {
  return;
};

// HTTP POST - Edit user profile
exports.user_edit_post = (req, res) => {
  return;
};

// HTTP GET - delete user profile
exports.user_delete_get = (req, res) => {
  return;
};
