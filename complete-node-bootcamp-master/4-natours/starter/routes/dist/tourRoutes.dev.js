"use strict";

// ROUTES
// MIDDLEWARE
var express = require('express');

var tourController = require('./../controllers/tourController');

var router = express.Router();
router.param('id', tourController.checkId); // Create a checkBody middleware
// Chck if body contains the name and price property
// if not, return 400 (bad request))
// add it to the post handler stack

router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour); // REMPACE : app.get('/api/v1/tours', getAllTours) et app.post('/api/v1/tours', createTour)

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour)["delete"](tourController.deleteTour);
module.exports = router;