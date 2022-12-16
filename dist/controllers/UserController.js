"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body)
      const { id, full_name, email } = newUser
      return res.json({ id, full_name, email })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'full_name', 'email'] })

      // logs 'undefined' if didn't generate jwt (new users not logged in for example):
      console.log('USER ID:', req.userId)
      console.log('USER EMAIL:', req.userEmail)

      return res.json(users)
    } catch (e) {
      return res.json(null)
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id)
      const { id, full_name, email } = user
      return res.json({ id, full_name, email })
    } catch (e) {
      return res.json(null)
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId) // req.userId comes from loginRequired middleware

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist.'],
        })
      }

      const newUserData = await user.update(req.body)
      const { id, full_name, email } = newUserData
      console.log(req.body)

      return res.json({ id, full_name, email })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId) // req.userId comes from loginRequired middleware
      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist.'],
        })
      }

      await user.destroy()

      return res.json({
        userDeleted: true,
      })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

exports. default = new UserController()
