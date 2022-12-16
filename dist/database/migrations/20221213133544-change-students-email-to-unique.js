"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'students',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    )
  },

  async down() {
    return null
  },
}
