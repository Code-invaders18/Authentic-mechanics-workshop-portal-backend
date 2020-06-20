const express = require("express");
const router = express.Router();
const {
  getServiceById,
  createService,
  getAllServices,
  removeService,
  getService,
  findServiceByUserId,
} = require("../controller/service");
const { getUserById } = require("../controller/user");
const { isSignedIn, isAuthenticated } = require("../controller/auth");
//params
router.param("serviceId", getServiceById);
router.param("userId", getUserById);
router.param("userServiceId", findServiceByUserId);

//create service
router.post("/service/create/:userId", createService);
//getting all services
router.get("/services", getAllServices);
//to get a single service by id
router.get("/servicebyid/:serviceId", getService);
//to get a service by userId
router.get(
  "/serviceByUser/:userServiceId",
  isSignedIn,
  findServiceByUserId,
  getService
);
//to get all services by userId
router.get("/user/service/:userId");
//to delete service
router.delete("/service/delete/:serviceId", removeService);

module.exports = router;
