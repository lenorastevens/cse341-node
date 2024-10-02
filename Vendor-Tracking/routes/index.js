const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/vendors', require('./vendors'));

router.use('/appUsers', require('./appUsers'));

module.exports = router;
