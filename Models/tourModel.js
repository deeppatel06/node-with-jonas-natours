//

const mongoose = require('mongoose');

// creating Mongoose schema ...
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: String,
    required: [true, 'A tour must have price'],
  },
});

// // creating model from schema ...
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.5,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log('Error: ', err));
