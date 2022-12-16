"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      first_name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        valildate: {
          len: {
            args: [3, 255],
            msg: 'First Name length must be between 3 and 255 characters.',
          },
        },
      },
      last_name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        valildate: {
          len: {
            args: [3, 255],
            msg: 'Last Name length must be between 3 and 255 characters.',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already used for a registered account.',
        },
        valildate: {
          isEmail: {
            msg: 'Invalid email address.',
          },
        },
      },
      age: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        valildate: {
          isInt: {
            msg: 'Age must be an integer (number).',
          },
        },
      },
      weight: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        valildate: {
          isFloat: {
            msg: 'Weight value must be an integer or a float number (with decimal values).',
          },
        },
      },
      height: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        valildate: {
          isFloat: {
            msg: 'Height value must be an integer or a float number (with decimal values).',
          },
        },
      },
    }, {
      sequelize,
    })
    return this
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' })
  }
} exports.default = Student;
