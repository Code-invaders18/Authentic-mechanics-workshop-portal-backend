const express = require("express");
const router = express.Router();
const {
  getServiceById,
  createService,
  getAllServices,
  removeService,
  getService,
  findServiceByUserId,
  createServiceWithoutId,
} = require("../controller/service");
const { getUserById } = require("../controller/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controller/auth");
//params
router.param("serviceId", getServiceById);
router.param("userId", getUserById);
router.param("userServiceId", findServiceByUserId);

//create service
router.post(
  "/service/create/:userId",
  isSignedIn,
  isAuthenticated,
  createService
);
router.post("/service/create", createServiceWithoutId);
//getting all services
router.get("/services", getAllServices);
//to get a single service by id
router.get("/servicebyid/:serviceId", getService);
//to get a service by userId
router.get("/serviceByUser/:userServiceId", isSignedIn, getService);
//to get all services by userId
router.get("/user/service/:userId");
//to delete service
router.delete(
  "/service/delete/:serviceId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeService
);

module.exports = router;
