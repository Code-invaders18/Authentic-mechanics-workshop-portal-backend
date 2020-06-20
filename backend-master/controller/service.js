const Service = require("../models/serviceRequest");

exports.getServiceById = (req, res, next, id) => {
  Service.findById(id)
    .populate("user", "_id")
    .exec((err, service) => {
      if (err) {
        return res.status(400).json({
          error: "Service not found",
        });
      }
      req.service = service;
      next();
    });
};
exports.findServiceByUserId = (req, res, next, id) => {
  console.log(id);
  Service.findOne({ $or: [{ user: id }] }).exec((err, service) => {
    if (err) {
      return res.status(400).json({
        error: "Service not found by userid",
      });
    }
    req.service = service;
    next();
  });
};

exports.createService = (req, res) => {
  //working
  req.body.user = req.profile._id;
  const service = new Service(req.body);
  console.log(req.body);
  service.save((err, service) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "not able to save Service in DB",
      });
    }
    res.json(service);
  });
};

exports.getService = (req, res) => {
  //working
  return res.json(req.service);
};
//get all the services
exports.getAllServices = (req, res) => {
  //working
  Service.find().exec((err, services) => {
    if (err) {
      return res.status(400).json({
        error: "No Services found",
      });
    }
    res.json(services);
  });
};
exports.removeService = (req, res) => {
  //working
  //from the middleware
  const service = req.service;
  //down wali category tell us yes..i have deleted this
  service.remove((err, service) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this service due to some error",
      });
    }
    res.json({
      message: " service succesfull deleted",
    });
  });
};
