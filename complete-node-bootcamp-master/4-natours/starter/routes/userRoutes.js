// ROUTES
// MIDDLEWARE
const express = require('express');
const userController = require('./../controllers/userController');


const router = express.Router();

router
  .route('/api/v1/users')
  .get(userController.getAllUsers)
  .post(userController.createUsers);

router
  .route('/api/v1/Users/:id')
  .get(userController.getUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

module.exports = router;
