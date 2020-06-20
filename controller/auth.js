const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req); //it is a middleware nd we want it before the req is placed

  if (!errors.isEmpty()) {
    return res.status(420).json({
      error: errors.array()[0].msg, //here we will be displaying only 1st object details ie[0] msg
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User already exist !!",
      });
    }
    res.json({
      //give me this response
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    });
  });
};
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email doesnot exist !!",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password donot match !!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SEC); //create token
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name, lastname, email, role } = user;

    return res.json({ token, user: { _id, name, lastname, email, role } });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user has signout sucessfully",
  });
};
//protected routes
//here down we r having a predefined middleware
//in this we r using expressJwt nd thats y we r not requiring next() in it
exports.isSignedIn = expressJwt({
  secret: process.env.SEC,
  //here we r sending auth as a request to the route nd this will have our id of db
  userProperty: "auth",
});
//custom middleware
//note:we r populating the req.profile from the user.js controller
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
//here the role has come from the 'user.js' file where default value decided the account end
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not an ADMIN,Acess Denied",
    });
  }
  next();
};
