const router = require('express').Router();
const passport = require('passport');

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

module.exports = router;
