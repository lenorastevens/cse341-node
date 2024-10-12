const express = require('express');
const router = express.Router();

const appUsersController = require('../controllers/appUsers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', appUsersController.getAllUsers);

router.get('/:id', appUsersController.getSingleUser);

router.post('/', isAuthenticated, validation.saveAppUser, appUsersController.createAppUser);

router.put('/:id', isAuthenticated, validation.saveAppUser, appUsersController.updateAppUser);

router.delete('/:id', isAuthenticated, appUsersController.deleteAppUser);

module.exports = router;