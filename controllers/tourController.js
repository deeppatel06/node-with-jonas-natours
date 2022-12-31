//

const Tour = require('./../Models/tourModel');

const APIFeature = require('../utils/apiFeatures');

// alias route with middleware ...
exports.alisTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // step: execute query ...
    const features = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours = await features.query;

    // step: send response ...
    res.status(200).json({
      status: 'success',
      // from middleware ...
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      body: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent ...',
      // message: error,
    });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    // works same way as ==> Tour.findOne({ _id: req.params.id });
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      body: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //
    });
    res.status(201).json({
      status: 'success',
      message: tour,
    });
  } catch (error) {
    res.status(201).json({
      status: 'success',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Not found',
    });
  }
};
