import Sequelize, { Model } from 'sequelize'

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      first_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        valildate: {
          len: {
            args: [3, 255],
            msg: 'First Name length must be between 3 and 255 characters.',
          },
        },
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        valildate: {
          len: {
            args: [3, 255],
            msg: 'Last Name length must be between 3 and 255 characters.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        defaultValue: '',
        valildate: {
          isInt: {
            msg: 'Age must be an integer (number).',
          },
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        valildate: {
          isFloat: {
            msg: 'Weight value must be an integer or a float number (with decimal values).',
          },
        },
      },
      height: {
        type: Sequelize.FLOAT,
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
}
