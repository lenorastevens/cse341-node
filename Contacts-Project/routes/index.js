const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello, CSE 341. Documentation URL: https://cse341-contacts-project-ep1p.onrender.com");
  });

router.use('/contacts', require('./contacts'));

module.exports = router;