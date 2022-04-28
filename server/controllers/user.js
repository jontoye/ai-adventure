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

// exports.user_info_get = (req, res) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       console.log(user);
//     })
//     .catch((err) => {
//       console.error(err);
//       // res.json({ error: err})
//     });
// };

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

exports.user_profile_avatar_put = (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate({ _id: req.params.userId }, { avatar: req.body.avatar })
    .then((user) => {
      res.json({ message: "success", user: user });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.user_profile_biography_post = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { biography: req.body.biography }
  )
    .then((user) => {
      res.json({ message: "success", user: user });
    })
    .catch((err) => {
      console.error(err);
    });
};

// HTTP POST - adds friends and followers
exports.user_profile_addsocial_post = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (req.body.add === "friend") {
        user.friends.push(req.body.user);
      }
      if (req.body.add === "follower") {
        user.followers.push(req.body.user);
      }
      if (req.body.add === "following") {
        user.following.push(req.body.user);
      }
      user.save().then((updatedUser) => {
        console.log(updatedUser);
        res.json({ message: "success" });
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// HTTP POST - removes friends and followers
exports.user_profile_removesocial_post = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (req.body.remove === "friend") {
        user.friends.splice(
          user.friends.findIndex((friend) => friend.id === req.body.user),
          1
        );
      }
      if (req.body.remove === "follower") {
        user.followers.splice(
          user.followers.findIndex((friend) => friend.id === req.body.user),
          1
        );
      }
      if (req.body.remove === "following") {
        user.following.splice(
          user.following.findIndex((friend) => friend.id === req.body.user),
          1
        );
      }
      user.save().then((updatedUser) => {
        console.log(updatedUser);
        res.json({ message: "success" });
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
