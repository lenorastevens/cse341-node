const express = require('express');
const router = express.Router();

const appUsersController = require('../controllers/appUsers');
const validation = require('../middleware/validate');

router.get('/', appUsersController.getAllUsers);

router.get('/:id', appUsersController.getSingleUser);

router.post('/', validation.saveAppUser, appUsersController.createAppUser);

router.delete('/:id', appUsersController.deleteAppUser);

module.exports = router;