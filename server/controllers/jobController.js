require('../models/job');
const mongoose = require('mongoose');
const cron = require('cron');
const axios = require('axios');
const { IncomingWebhook } = require('@slack/client');

const { SLACK_URL } = require('../constants');

const Job = mongoose.model('Job');

exports.validateJob = (req, res, next) => {
  // we can use this methods on req object
  // due to expressValidator middleware (mounted in index.js)
  req.sanitizeBody('message');
  req.checkBody('message', 'Message must be supplied!').notEmpty();
  req.sanitizeBody('date');
  req.checkBody('date', 'Date must be supplied!').notEmpty();
  req.checkBody('date', 'Expected date!').isDate();

  const errors = req.validationErrors(); // it will gather all error from above and put them in object
  if (req.body.date < Date.now()) {
    errors.push({
      msg: 'Date cant be in the past.',
      params: 'date',
    });
  }
  if (errors) {
    res.status(400).json(errors);
  }

  return next(); // there were no errors
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();

  return res.status(200).send(jobs);
};

const sendToSlack = async (message) => {
  try {
    const res = await axios({
      url: SLACK_URL,
      method: 'post',
      header: { 'Content-type': 'application/json' },
      data: { text: message },
    });

    const webhook = new IncomingWebhook('https://hooks.slack.com/services/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');

    // Send simple text to the webhook channel
    webhook.send('Hello there', (err, response) => {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Message sent: ', response);
      }
    });

    return res.status;


  } catch (e) {
    // TODO: handle error
    console.error(e);
  }

  return true;
};

const updateStatusInDb = async (job) => {
  const updatedJob = await Job.findOneAndUpdate({ _id: job.id }, { $set: { status: 'Sent' } }, {
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
      sendToSlack(job.message);
      cronJob.stop();
    },
    onComplete: () => updateStatusInDb(job),
    start: true,
    timeZone: 'Europe/Zagreb',
  });

  return res.status(200).send(job);
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findOneAndRemove({ _id: req.params.id });

  return res.status(200).send(job._id);
};
