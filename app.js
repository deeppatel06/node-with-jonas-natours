//

// requires ...
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/toursRouter');
const userRouter = require('./routes/usersRouter');

const app = express();

//// 1). Middlewares ...
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

// middlewares ...
app.use(express.json());

// static files ...
app.use(express.static(`${__dirname}/public`));

// creating custom middlewares ...
// this middleware will execute for all of the belowe APIs and not for the above APIs ....
// app.use((req, res, next) => {
//   console.log('=== inside custom middleware ...');
//   next(); // always trigger next(), if we're using custom middleware ...
// });

// creating custom middlewares ...
// this middleware will execute for all of the belowe APIs and not for the above APIs ....
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// added last router.
// if none of the above will executed means there is no matching route here ..
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server!`,
  });
  // next();
});

module.exports = app;
