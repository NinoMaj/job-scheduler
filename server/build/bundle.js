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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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


module.exports = {
  API_ROOT: '/api/v1',
  JOBS_API: '/jobs',
  SLACK_URL: 'https://hooks.slack.com/services/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'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

// Main starting point of the application
var express = __webpack_require__(1);
var http = __webpack_require__(4);
var path = __webpack_require__(5);

var app = express();
var morgan = __webpack_require__(6);
var bodyParser = __webpack_require__(7);
var expressValidator = __webpack_require__(8);
var cors = __webpack_require__(9);
var mongoose = __webpack_require__(0);

var jobsRouter = __webpack_require__(10);

var _require = __webpack_require__(2),
    API_ROOT = _require.API_ROOT,
    JOBS_API = _require.JOBS_API;

__webpack_require__(17).config();

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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(1);

var router = express.Router();

var _require = __webpack_require__(11),
    catchErrors = _require.catchErrors;

var jobsController = __webpack_require__(12);

router.get('/', catchErrors(jobsController.getJobs));
router.post('/', jobsController.validateJob, catchErrors(jobsController.addJob));
router.delete('/:id', catchErrors(jobsController.deleteJob));

module.exports = router;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

__webpack_require__(13);
var mongoose = __webpack_require__(0);
var cron = __webpack_require__(14);
var axios = __webpack_require__(15);

var _require = __webpack_require__(16),
    IncomingWebhook = _require.IncomingWebhook;

var _require2 = __webpack_require__(2),
    SLACK_URL = _require2.SLACK_URL;

var Job = mongoose.model('Job');

exports.validateJob = function (req, res, next) {
  // we can use this methods on req object
  // due to expressValidator middleware (mounted in index.js)
  req.sanitizeBody('message');
  req.checkBody('message', 'Message must be supplied!').notEmpty();
  req.sanitizeBody('date');
  req.checkBody('date', 'Date must be supplied!').notEmpty();
  req.checkBody('date', 'Expected date!').isDate();

  var errors = req.validationErrors(); // it will gather all error from above and put them in object
  if (req.body.date < Date.now()) {
    errors.push({
      msg: 'Date cant be in the past.',
      params: 'date'
    });
  }
  if (errors) {
    res.status(400).json(errors);
  }

  return next(); // there were no errors
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

var sendToSlack = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
    var res, webhook;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios({
              url: SLACK_URL,
              method: 'post',
              header: { 'Content-type': 'application/json' },
              data: { text: message }
            });

          case 3:
            res = _context2.sent;
            webhook = new IncomingWebhook('https://hooks.slack.com/services/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');

            // Send simple text to the webhook channel

            webhook.send('Hello there', function (err, response) {
              if (err) {
                console.log('Error:', err);
              } else {
                console.log('Message sent: ', response);
              }
            });

            return _context2.abrupt('return', res.status);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);

            // TODO: handle error
            console.error(_context2.t0);

          case 12:
            return _context2.abrupt('return', true);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function sendToSlack(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var updateStatusInDb = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(job) {
    var updatedJob;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Job.findOneAndUpdate({ _id: job.id }, { $set: { status: 'Sent' } }, {
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

  return function updateStatusInDb(_x4) {
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
                sendToSlack(job.message);
                cronJob.stop();
              },
              onComplete: function onComplete() {
                return updateStatusInDb(job);
              },
              start: true,
              timeZone: 'Europe/Zagreb'
            });
            return _context4.abrupt('return', res.status(200).send(job));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x5, _x6) {
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

  return function (_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);

mongoose.Promise = global.Promise;

var jobSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
    required: 'Pease enter a jobs message!'
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
  // author: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: 'You must supply an author',
  // }
});

// storeSchema.pre('save', async function(next) {
//   if (!this.isModified('name')) {
//     next();
//     return;
//   }
//   this.slug = slug(this.name);

//   const slugReqEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
//   const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
//   if (storesWithSlug.length) {
//     this.slug = `${this.slug}-${storeWithSlug.length + 1}`;
//   }

//   next();
// })

module.exports = mongoose.model('Job', jobSchema);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@slack/client");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);