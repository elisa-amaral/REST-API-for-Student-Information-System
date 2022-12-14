import Sequelize, { Model } from 'sequelize'
import bcryptjs from 'bcryptjs'

export default class User extends Model {
  static init(sequelize) {
    super.init({
      full_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 255],
            msg: 'Full Name field length must be between 5 and 255.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
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
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }
    })

    return this
  }

  passwordIsCorrect(password) {
    return bcryptjs.compare(password, this.password_hash)
  }
}
