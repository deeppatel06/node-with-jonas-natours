//

const Tour = require('./../Models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // from middleware ...
    createdAt: req.requestTime,
    message: 'This route is not implemented yet ...',
  });
};

exports.createTour = (req, res) => {
  res
    .status(201)
    .json({
      status: 'success',
      message: 'This route is not implemented yet ...',
    });
};

exports.getSingleTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    message: 'This route is not implemented yet ...',
  });
};

exports.updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'This route is not implemented yet ...',
  });
};

exports.deleteTour = (req, res) => {
  res
    .status(204)
    .json({
      status: 'success',
      message: 'This route is not implemented yet ...',
    });
};
