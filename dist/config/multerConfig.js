"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// makes sure no photo has the same name even if uploaded at exact same millisecond
const random = () => Math.floor(Math.random() * 10000 + 10000)

exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('Photo type must be either PNG or JPG.'))
    }

    return cb(null, true)
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
      // Date.now gets date as file name, extname extracts extension
      cb(null, `${Date.now()}_${random()}${_path.extname.call(void 0, file.originalname)}`)
    },
  }),

}
