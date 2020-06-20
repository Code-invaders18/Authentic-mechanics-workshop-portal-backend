var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signin, signout } = require("../controller/auth");

router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 char long").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 5 char long").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({
      min: 3,
    }),
  ],
  signin
);
router.get("/signout", signout);
module.exports = router;
