const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello, CSE 341 Professional Database Users.");
});

router.use('/professional', require('./professionalRoutes'));

module.exports = router;