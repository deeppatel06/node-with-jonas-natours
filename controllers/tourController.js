//

const Tour = require('./../Models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // 1. we can pass this query object directly to the find method ...
    // console.log(req.query);
    // const tours = await Tour.find(req.query);

    // 2. this one will do the same job as above ...
    // check this for reference: https://mongoosejs.com/docs/queries.html
    // const tourss = await Tour.find()
    //   .where('difficulty')
    //   .equals('easy')
    //   .where('duration')
    //   .equals(5);

    // 3. to exclude some of the fields, we can do something like this ...
    //// Good practice is
    // step a. build the query ...
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    // const query = Tour.find(queryObj);

    //// advanced filtering here ...
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));

    //// sorting query ...
    if (req.query.sort) {
      // request with "-" to sort reversly, like { sort: -price } ...
      // query = query.sort(req.query.sort);
      // we can have multiple sorting options here, like { sort: price,ratingsAverage } ...
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // step b. execute query ...
    const tours = await query;

    // step c. send response ...
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
