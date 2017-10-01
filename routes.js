const express = require('express');
const router = express.Router();
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;
const studentRouter = require('./studentRoute');
const teacherRouter = require('./teacherRoute');

router.route('/').get((req, res, next) => {
	// Visit http://localhost:8080 to see the message!
  // res.send('Welcome to the Student Portal!');
  res.render('index');
});

// Send each request to their appropriate route
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);

module.exports = router;
