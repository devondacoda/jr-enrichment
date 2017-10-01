const express = require('express');
const app = express();
const router = require('./routes');
const nunjucks = require('nunjucks');
const db = require('./db');
const student = db.Student;
const teacher = db.Teacher;

let PORT = 8080;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
// Send all requests over to router file
app.use(router);

// Sync up database and seed tables
db.db.sync({force: true})
.then(() => {
	student.bulkCreate([{
		name: 'Charles',
		gpa: 3,
		teacherId: 1
	}, {
		name: 'Mary',
		gpa: 3,
		teacherId: 1
	}, {
		name: 'Angel',
		gpa: 4,
		teacherId: 2
	}, {
		name: 'David',
		gpa: 3.8,
		teacherId: 3
	}]);
})
.then(() => {
	teacher.bulkCreate([{
		name: 'Ray',
		subject: 'Spanish'
	}, {
		name: 'Neema',
		subject: 'Math'
	}, {
		name: 'Barry',
		subject: 'Art'
	}]);
})
.then(() => {
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
});
