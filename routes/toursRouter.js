//

const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// Alias route
router
  .route('/top-5-cheap')
  .get(tourController.alisTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
