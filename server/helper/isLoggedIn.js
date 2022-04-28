// Middleware for user to check.
// module.exports = (req, res, next) => {
//     if(!req.user)
//     {
//         res.redirect("/auth/signin")
//     }
//     else{
//         next();
//     }
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  //   console.log("req header", req);
  //token from header
  // const token = req.header("x-auth-token")
  // console.log(token);
  var authorizationToken = req.header("Authorization");
  authorizationToken = authorizationToken.replace("Bearer ", "");
  let token = authorizationToken;

  if (!token) {
    return res
      .json({ message: "You must sign in to view this page." })
      .status(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.json({ message: "Invalid user token." });
  }
};
