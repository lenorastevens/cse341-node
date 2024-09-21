const express = require('express');
const router = express.Router();

const  professionalController = require('../controllers/professionalControllers');

router.get('/', professionalController.getAll);

router.get('/:id', professionalController.getSingle);

module.exports = router;