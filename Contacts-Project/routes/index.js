const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.send("Hello, CSE 341. Documentation URL: https://cse341-contacts-project-ep1p.onrender.com");
//   });

router.use('/contacts', require('./contacts'));

router.use('/', (docData = (req, res) => {
  let docData = {
    documentationURL: 'https://cse341-contacts-project-ep1p.onrender.com/api-docs',
  };
  res.send(docData);
})
);

module.exports = router;