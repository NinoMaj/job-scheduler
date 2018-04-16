/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

// Main starting point of the application
var express = __webpack_require__(1);
var http = __webpack_require__(3);
var path = __webpack_require__(4);

var app = express();
var morgan = __webpack_require__(5);
var bodyParser = __webpack_require__(6);
var expressValidator = __webpack_require__(7);
var cors = __webpack_require__(8);
var mongoose = __webpack_require__(0);

var jobsRouter = __webpack_require__(9);

var _require = __webpack_require__(15),
    API_ROOT = _require.API_ROOT,
    JOBS_API = _require.JOBS_API;

__webpack_require__(16).config();

// DB Setup
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

// App Setup
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(expressValidator());
var corsOptions = {
  origin: 'http://localhost:4100',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Router handlers
app.use(API_ROOT + JOBS_API, jobsRouter);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Server Setup
var port = process.env.PORT || 3001;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(1);

var router = express.Router();

var _require = __webpack_require__(10),
    catchErrors = _require.catchErrors;

var jobsController = __webpack_require__(11);

router.get('/', catchErrors(jobsController.getJobs));
router.post('/', jobsController.validateJob, catchErrors(jobsController.addJob));
router.delete('/:id', catchErrors(jobsController.deleteJob));

module.exports = router;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.catchErrors = function (fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(function (e) {
      console.log('Error catched', e);next();
    });
  };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

__webpack_require__(12);
var mongoose = __webpack_require__(0);
var cron = __webpack_require__(13);
var axios = __webpack_require__(14);

var Job = mongoose.model('Job');

exports.validateJob = function (req, res, next) {
  req.sanitizeBody('message');
  req.checkBody('message', 'Message must be supplied!').notEmpty();
  req.sanitizeBody('date');
  req.checkBody('date', 'Date must be supplied!').notEmpty();
  req.checkBody('date', 'Expected date!').isDate();

  // Gather all errors from above
  var errors = req.validationErrors();

  // Check if selected date is in future
  if (req.body.date < Date.now()) {
    errors.push({
      msg: 'Date cant be in the past.',
      params: 'date'
    });
  }
  if (errors) {
    res.status(400).json(errors);
  }

  return next();
};

exports.getJobs = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var jobs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Job.find();

          case 2:
            jobs = _context.sent;
            return _context.abrupt('return', res.status(200).send(jobs));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// TODO: extract slack integration in seperate service -> services/slack.js
var sendToSlack = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
    var res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios({
              url: process.env.SLACK_WEBHOOK_URL,
              method: 'post',
              header: { 'Content-type': 'application/json' },
              data: { text: message }
            });

          case 3:
            res = _context2.sent;
            return _context2.abrupt('return', res.status);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            // TODO: handle error
            console.error(_context2.t0);
            return _context2.abrupt('return', _context2.t0);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function sendToSlack(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var updateStatusInDb = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(job, newStatus) {
    var updatedJob;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Job.findOneAndUpdate({ _id: job.id }, { $set: { status: newStatus } }, {
              new: true,
              runValidators: true
            }).exec();

          case 2:
            updatedJob = _context3.sent;


            updatedJob.markModified('status');
            _context3.next = 6;
            return updatedJob.save();

          case 6:
            return _context3.abrupt('return', updatedJob);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function updateStatusInDb(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addJob = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var job, cronJob;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            job = new Job(req.body);
            _context4.next = 3;
            return job.save();

          case 3:
            cronJob = new cron.CronJob({
              cronTime: new Date(job.date),
              onTick: function onTick() {
                var resStatus = sendToSlack(job.message);
                if (resStatus === 200) {
                  updateStatusInDb(job, 'Sent');
                } else {
                  updateStatusInDb(job, 'Error');
                }
                cronJob.stop();
              },
              start: true,
              timeZone: 'Europe/Zagreb'
            });
            return _context4.abrupt('return', res.status(201).send(job));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteJob = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var job;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Job.findOneAndRemove({ _id: req.params.id });

          case 2:
            job = _context5.sent;
            return _context5.abrupt('return', res.status(200).send(job._id));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);

mongoose.Promise = global.Promise;

var jobSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
    required: 'Pease enter a job\'s message!'
  },
  channel: {
    type: String
  },
  status: {
    type: String,
    default: 'Waiting'
  },
  date: {
    type: Date,
    required: 'Pease enter when would you like to post a job!'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  API_ROOT: '/api/v1',
  JOBS_API: '/jobs'
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);