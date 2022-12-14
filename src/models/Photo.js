import Sequelize, { Model } from 'sequelize'
import appConfig from '../config/appConfig'

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        valildate: {
          notEmpty: {
            msg: 'Field originalname cannot be empty.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        valildate: {
          notEmpty: {
            msg: 'Field filename cannot be empty.',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
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
}
