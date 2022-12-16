"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        valildate: {
          notEmpty: {
            msg: 'Field originalname cannot be empty.',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        valildate: {
          notEmpty: {
            msg: 'Field filename cannot be empty.',
          },
        },
      },
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`
        },
      },
    }, {
      sequelize,
      tableName: 'photos',
    })
    return this
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' })
  }
} exports.default = Photo;
