const User = require("../models/user");

//here we r wworking with the 'params' as id
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found",
      });
    }
    //here we r creating an object in the req
    //here we r populating the value of req.profile
    req.profile = user;
    next();
  });
};

//simple method to grab the user
exports.getUser = (req, res) => {
  //TODO:Get back here for the password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  //req.profile.createdAt = undefined;
  //req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
//simple method to get all users in database
exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "NO USERS HAVE BEEN FOUND",
      });
    }
    return res.json(users);
  });
};
