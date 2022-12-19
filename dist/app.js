"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config()

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _studentRoutes = require('./routes/studentRoutes'); var _studentRoutes2 = _interopRequireDefault(_studentRoutes);
var _photoRoutes = require('./routes/photoRoutes'); var _photoRoutes2 = _interopRequireDefault(_photoRoutes);

const whiteList = [
  'http://localhost:3000', // student information system front-end (React.js)
  'http://localhost:3001', // REST API on localhost
  '*',
]

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Origin not allowed by Cors: ${origin}`))
    }
  },
}

class App {
  constructor() {
    this.app = _express2.default.call(void 0, )
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions))
    this.app.use(_express2.default.urlencoded({ extended: true }))
    this.app.use(_express2.default.json())
    this.app.use('/images/', _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')))
  }

  routes() {
    this.app.use('/', _homeRoutes2.default)
    this.app.use('/users', _userRoutes2.default)
    this.app.use('/tokens', _tokenRoutes2.default)
    this.app.use('/students', _studentRoutes2.default)
    this.app.use('/photos', _photoRoutes2.default)
  }
}

exports. default = new App().app
