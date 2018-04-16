require('../models/job');
const mongoose = require('mongoose');
const cron = require('cron');
const axios = require('axios');

const Job = mongoose.model('Job');

exports.validateJob = (req, res, next) => {
  req.sanitizeBody('message');
  req.checkBody('message', 'Message must be supplied!').notEmpty();
  req.sanitizeBody('date');
  req.checkBody('date', 'Date must be supplied!').notEmpty();
  req.checkBody('date', 'Expected date!').isDate();

  // Gather all errors from above
  const errors = req.validationErrors();

  // Check if selected date is in future
  if (req.body.date < Date.now()) {
    errors.push({
      msg: 'Date cant be in the past.',
      params: 'date',
    });
  }
  if (errors) {
    res.status(400).json(errors);
  }

  return next();
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();

  return res.status(200).send(jobs);
};

// TODO: extract slack integration in seperate service -> services/slack.js
const sendToSlack = async (message) => {
  try {
    const res = await axios({
      url: process.env.SLACK_WEBHOOK_URL,
      method: 'post',
      header: { 'Content-type': 'application/json' },
      data: { text: message },
    });

    return res.status;
  } catch (e) {
    // TODO: handle error
    console.error(e);
    return e;
  }
};

const updateStatusInDb = async (job, newStatus) => {
  const updatedJob = await Job.findOneAndUpdate({ _id: job.id }, { $set: { status: newStatus } }, {
    new: true,
    runValidators: true,
  }).exec();

  updatedJob.markModified('status');
  await updatedJob.save();

  return updatedJob;
};

exports.addJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();

  const cronJob = new cron.CronJob({
    cronTime: new Date(job.date),
    onTick: () => {
      const resStatus = sendToSlack(job.message);
      if (resStatus === 200) {
        updateStatusInDb(job, 'Sent');
      } else {
        updateStatusInDb(job, 'Error');
      }
      cronJob.stop();
    },
    start: true,
    timeZone: 'Europe/Zagreb',
  });

  return res.status(201).send(job);
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findOneAndRemove({ _id: req.params.id });

  return res.status(200).send(job._id);
};
