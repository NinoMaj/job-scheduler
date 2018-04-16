// Main starting point of the application
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const mongoose = require('mongoose');

const jobsRouter = require('./routers/jobsRouter');
const { API_ROOT, JOBS_API } = require('./constants/api');

require('dotenv').config();

// DB Setup

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise,
});

// App Setup
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(expressValidator());
const corsOptions = {
  origin: 'http://localhost:4100',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Router handlers
app.use(API_ROOT + JOBS_API, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Server Setup
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
