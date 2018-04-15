const express = require('express');

const router = express.Router();

const { catchErrors } = require('../services/errorHandler.js');
const jobsController = require('../controllers/jobController');

router.get('/', catchErrors(jobsController.getJobs));
router.post('/', jobsController.validateJob, catchErrors(jobsController.addJob));
router.delete('/:id', catchErrors(jobsController.deleteJob));

module.exports = router;
