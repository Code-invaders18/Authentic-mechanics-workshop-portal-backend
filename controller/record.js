const Record = require("../models/record");

exports.getRecordById = (req, res, next, id) => {
  Record.findById(id).exec((err, record) => {
    if (err) {
      return res.status(400).json({
        error: "Record not found",
      });
    }
    req.record = record;
    next();
  });
};
// exports.findServiceByUserId = (req, res, next, id) => {
//   console.log(id);
//   Record.findOne({ $or: [{ user: id }] }).exec((err, service) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Record not found by userid",
//       });
//     }
//     req.service = service;
//     next();
//   });
// };

//creation of record
exports.createRecord = (req, res) => {
  req.body.user = req.profile._id;
  const record = new Record(req.body);
  record.save((err, record) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Every field is mandatory !!",
      });
    }
    res.json(record);
  });
};
//get a single service
exports.getRecord = (req, res) => {
  return res.json(req.service);
};
//get all the services
exports.getAllRecord = (req, res) => {
  Record.find().exec((err, records) => {
    if (err) {
      return res.status(400).json({
        error: "No Record found",
      });
    }
    res.json(records);
  });
};
exports.removeRecord = (req, res) => {
  //working
  //from the middleware
  const record = req.record;
  record.remove((err, record) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this record from Database due to some error",
      });
    }
    res.json({
      message: " Record succesfully deleted",
    });
  });
};
