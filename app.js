const express = require('express');
const app = express();
const router = require('./routes');
const db = require('./db').db;
const nunjucks = require('nunjucks');

let PORT = 8080;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(router);

db.sync({force: true})
.then(() => {
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
});
