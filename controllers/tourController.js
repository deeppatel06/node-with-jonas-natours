//

// const fs = require('fs');
const Tour = require('./../Models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//   const tour = tours.find((tour) => tour.id === req.params.id * 1);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Record not found ... !!',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     console.log(req.body);
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Bad request / required properties missing ...',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // from middleware ...
    createdAt: req.requestTime,
    // results: tours?.length,
    // data: { tours },
  });
};

exports.createTour = (req, res) => {
  // const newId = tours[tours?.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  res.status(201).json({ status: 'success', data: { tour: newTour } });
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (data) => {
  //     res.status(201).json({ status: 'success', data: { tour: newTour } });
  //   }
  // );
};

exports.getSingleTour = (req, res) => {
  //   console.log(req.params);

  // const id = req.params.id * 1; // converting str to num here ...
  // const tour = tours.find((tour) => tour.id === id);

  // cuz we've added validation above ...
  //   if (!tour) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'invalid Id',
  //     });
  //   }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // data: { tour },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((tour) => tour.id === id);

  // cuz we've added validation above ...
  //   if (!tour) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'invalid Id',
  //     });
  //   }

  res.status(201).json({
    status: 'success',
    // message: { tour }
  });
};

exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((tour) => tour.id === id);

  // cuz we've added validation above ...
  //   if (!tour) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'invalid Id',
  //     });
  //   }

  res.status(204).json({ status: 'success', data: null });
};
