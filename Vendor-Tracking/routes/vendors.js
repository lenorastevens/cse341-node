const express = require('express');
const router = express.Router();

const vendorsController = require('../controllers/vendors');

router.get('/', vendorsController.getAllVendors);

router.get('/:id', vendorsController.getSingleVendor);

module.exports = router;