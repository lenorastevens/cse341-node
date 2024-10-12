const router = require('express').Router();
const passport = require('passport');

router.use('/vendors', require('./vendors'));

router.use('/appUsers', require('./appUsers'));

module.exports = router;
