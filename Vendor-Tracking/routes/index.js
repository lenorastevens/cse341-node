const router = require('express').Router();

router.use('/vendors', require('./vendors'));

router.use('/appUsers', require('./appUsers'));

router.use('/', (req, res) => {
    let docData = `
      <h1>Vendor Tracking API</h1>
      <p>Documentation URL: <a href="https://vendor-tracking.onrender.com/api-docs" target="_blank">
      https://vendor-tracking.onrender.com/api-docs</a></p>
    `;
    res.send(docData);
  });

module.exports = router;
