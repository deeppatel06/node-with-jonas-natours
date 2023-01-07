//

const mongoose = require('mongoose');
const slugify = require('slugify');

// creating Mongoose schema ...
const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], // required is built in validator
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less of equal 40 character'],
      minlength: [10, 'A tour name must have more of equal 10 character'],
    },
    slug: { type: String },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a Group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty should be either: easy, meduam, difficult',
      }, // enum will works with strings only
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'The rating must be above 1'], // min, max works with number and dates
      max: [5, 'The rating must be less than 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// creating virtual properties from schema ...
// Remember that this virtual queries are not the part of database, so we can't use them in query
tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

// DOCUMENT middleware - pre-middleware
// runs before .save() and .create() but not in .insertOne() or .insertMany()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('will save the documents');
//   next();
// });

// document - post middleware
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY middleware
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  // set the time when query starts execution
  this.exeStartTime = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took: ${Date.now() - this.exeStartTime} milliseconds!!!`);
  next();
});

// AGGREGATION middleware
tourSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// // creating model from schema ...
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
