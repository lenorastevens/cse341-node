const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello, CSE 341.");
  });

module.exports = router;