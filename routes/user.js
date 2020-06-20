const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUsers } = require("../controller/user");
const { isAuthenticated, isSignedIn } = require("../controller/auth");

//here we r populating our req.profile
router.param("userId", getUserById);

//MY ROUTES
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//for all users
router.get("/users", getAllUsers);

module.exports = router;
