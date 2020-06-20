var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signin, signout } = require("../controller/auth");

router.post(
  "/signup",
  [
    check("name", "Full name is required !!").isLength({ min: 3 }),
    check("email", "Email is required !!").isEmail(),
    check(
      "password",
      "Password should be atleast 5 character long !! "
    ).isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Valid email is required !!").isEmail(),
    check("password", "password field is required").isLength({
      min: 5,
    }),
  ],
  signin
);
router.get("/signout", signout);
module.exports = router;
