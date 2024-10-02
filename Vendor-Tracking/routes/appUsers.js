const express = require('express');
const router = express.Router();

const appUsersController = require('../controllers/appUsers');

router.get('/', appUsersController.getAllUsers);

router.get('/:id', appUsersController.getSingleUsers);

module.exports = router;