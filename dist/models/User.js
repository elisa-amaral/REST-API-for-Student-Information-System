"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      full_name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 255],
            msg: 'Full Name field length must be between 5 and 255.',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already used for a registered account. ',
        },
        validate: {
          isEmail: {
            msg: 'Invalid email address.',
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Password length must be between 6 and 50 characters.',
          },
        },
      },
    }, {
      sequelize,
    })

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8)
      }
    })

    return this
  }

  passwordIsCorrect(password) {
    return _bcryptjs2.default.compare(password, this.password_hash)
  }
} exports.default = User;
