const express = require('express');
const router = express.Router();
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;

router.route('/').get((req, res, next) => {
	// Visit http://localhost:8080 to see the message!
  // res.send('Welcome to the Student Portal!');
  res.render('index');
});

router.route('/student').get((req, res, next) => {
  res.render('student');
});

// Route to redirect to student page when search button is clicked
router.route('/search').get((req, res, next) => {
  // ------- TODO: FIGURE OUT HOW TO DYNAMICALLY GET STUDENT NAME INPUT AND PASS 
  // -------       IT AS THE 'NAME' PART OF THE URI
  res.redirect('/');
})
router.route('/student/:name')
.get((req, res, next) => {
  Student.findOrCreate({
    where: {
      name: req.params.name
    }
  }).then((field) => {
    res.json(field);
  });
});

module.exports = router;
