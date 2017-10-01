const teacher = require('./db').Teacher;
const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
  teacher.findAll()
  .then(teachers => {
    res.json(teachers);
  })
  .catch(next);
});

router.route('/:id')
.get((req, res, next) => {
  let teacherId = req.params.id;
  teacher.findById(teacherId)
  .then(selectedTeacher => {
    res.json(selectedTeacher);
  })
  .catch(next);
});

module.exports = router;
