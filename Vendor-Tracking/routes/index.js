const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect('/'); 
  });
});

router.use('/vendors', require('./vendors'));

router.use('/appUsers', require('./appUsers'));

router.use('/', (req, res) => {
    let docData = `
      <h1>Vendor Tracking API</h1>
      <p>Documentation URL: <a href="https://vendor-tracking.onrender.com/api-docs" target="_blank">
      https://vendor-tracking.onrender.com/api-docs</a></p>

      <p>${isAuthenticated ? `Logged in as: ${username}` : 'Logged out'}</p>

      <p><a href="/login">Login with GitHub</a></p>
      
      <p><a href="/logout">Logout</a></p>
    `;
    res.send(docData);
  });

module.exports = router;
