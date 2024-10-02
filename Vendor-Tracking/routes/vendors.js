const express = require('express');
const router = express.Router();

const vendorsController = require('../controllers/vendors');
const validation = require('../middleware/validate');

router.get('/', vendorsController.getAllVendors);

router.get('/:id', vendorsController.getSingleVendor);

router.post('/', validation.saveVendor, vendorsController.createVendor);

router.delete('/:id', vendorsController.deleteVendor);

module.exports = router;