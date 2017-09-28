const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/jr_enrichment', {
  logging: false
});


const Student = db.define('student', {
name: {
	type: Sequelize.STRING,
	allowNull: false
},
gpa: {
	type: Sequelize.INTEGER,
	allowNull: false
},
teacherId: {
	type: Sequelize.INTEGER,
	allowNull: false
}
}, {
setterMethods: {
	letterGrade(gpa) {
		if (gpa < 0.5) return 'F';
		if (gpa < 1.0) return 'D';
		if (gpa < 2.0) return 'C';
		if (gpa < 3.0) return 'B';
		if (gpa < 4.0) return 'A';
	}
}
});

Student.perfectGrade = () => {
const perfectScorers = [];
Student.findAll({where: {
	attributes: ['name', 'gpa']
}})
.then((perfectGpa) => {
	perfectGpa.forEach(student => perfectScorers.push(student));
})
.catch((error) => error);
};


const Teacher = db.define('teacher', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = {db, Student, Teacher};
