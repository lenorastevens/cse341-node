const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.send("Hello, CSE 341. Documentation URL: https://cse341-contacts-project-ep1p.onrender.com");
//   });

router.use('/contacts', require('./contacts'));

router.use('/', (req, res) => {
  let docData = `
    <h1>Hello, Fall CSE 341. This is my Contacts Project!</h1>
    <p>Documentation URL: <a href="https://cse341-contacts-project-ep1p.onrender.com/api-docs" target="_blank">
    https://cse341-contacts-project-ep1p.onrender.com/api-docs</a></p>
  `;
  res.send(docData);
});

module.exports = router;