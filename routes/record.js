const express = require("express");
const router = express.Router();
const {
  getRecordById,
  createRecord,
  getAllRecord,
  removeRecord,
  getRecord,
} = require("../controller/record");
const { getUserById } = require("../controller/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controller/auth");
//params
router.param("recordId", getRecordById);
router.param("userId", getUserById);

//create service
router.post(
  "/service/record/:userId",
  isSignedIn,
  isAuthenticated,
  createRecord
);
//getting all records
router.get("/services/record", getAllRecord);
//to get a single record by id
router.get("/servicebyid/:recordId", getRecord);
//to delete service
router.delete(
  "/service/record/delete/:recordId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeRecord
);

module.exports = router;
