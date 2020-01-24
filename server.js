require('dotenv/config');
require('./server/setEnvByCommandLine');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = new express();

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SESSION MIDDLEWARE
app.use(require('./server/sessionConfig'));

// PASSPORT MIDDLEWARE
require('./server/passportConfig')(app);

// ROUTES
app.use('/api/books', require('./routes/books'));
app.use('/api/dev', require('./routes/dev'));
app.use('/api/loans', require('./routes/loans'));
app.use('/api/students', require('./routes/students'));

// SPA STATIC FILES
require('./server/spaFileProvider')(app);

// OPEN SERVER
app.listen(port, () => {
  console.log(`server api started in http://localhost:${port}`);
});
