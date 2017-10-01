const student = require('./db').Student;
const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res, next) => {
  student.findAll()
  .then((students) => {
    res.json(students);
  })
  .catch(next);
});

router.route('/:id')
.get((req, res, next) => {
  let studentId = req.params.id;
  student.findById(studentId)
  .then(selectedStudent => {
    res.json(selectedStudent);
  })
  .catch(next);
});

router.route('/findStudents/:teacherid')
.get((req, res, next) => {
  let selectedTeacher = Number(req.params.teacherid);
  student.findAll({
    where: {
      teacherId: selectedTeacher
    }
  })
  .then(studentsForTeacher => {
    res.json(studentsForTeacher);
  })
  .catch(next);
});

router.route('/deleteStudent/:studentid')
.delete((req, res, next) => {
  student.destroy({
    where: {
      id: req.params.studentid
    }
  })
  .then(() => {
    res.status(202).json('DELETED!');
  });
});

router.route('/changeTeacher/:studentid/:newteacherid')
.put((req, res, next) => {
  student.update({
    teacherId: req.params.newteacherid
  }, {
    where: {
      id: req.params.studentid
    }
  })
  .then(() => {
    res.sendStatus(204);
  });
});


module.exports = router;
