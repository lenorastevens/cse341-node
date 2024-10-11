const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),  
  (req, res) => {
    console.log('Callback route hit');
    console.log('Authenticated user:', req.user);
    req.session.user = req.user;
    res.redirect('/');
});

router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`Logged in as ${req.session.user.displayName}`);
  } else{
    res.send('Not Logged In');
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect('/'); 
  });
});

router.use('/contacts', require('./contacts'));

module.exports = router;