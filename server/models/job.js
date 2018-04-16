const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const jobSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
    required: 'Pease enter a job\'s message!',
  },
  channel: {
    type: String,
  },
  status: {
    type: String,
    default: 'Waiting',
  },
  date: {
    type: Date,
    required: 'Pease enter when would you like to post a job!',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);
