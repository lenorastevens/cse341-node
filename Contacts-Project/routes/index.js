const router = require('express').Router();

router.use('/contacts', require('./contacts'));

router.use('/login', passport.authenticate('github'), (req, res) =>{});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.use('/', (req, res) => {
  let docData = `
    <h1>Hello, Fall CSE 341. This is my Contacts Project!</h1>
    <p>Documentation URL: <a href="https://cse341-contacts-project-ep1p.onrender.com/api-docs" target="_blank">
    https://cse341-contacts-project-ep1p.onrender.com/api-docs</a></p>
  `;
  res.send(docData);
});

module.exports = router;