import User from '../models/User'

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body)
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
      const users = await User.findAll({ attributes: ['id', 'full_name', 'email'] })

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
      const user = await User.findByPk(req.params.id)
      const { id, full_name, email } = user
      return res.json({ id, full_name, email })
    } catch (e) {
      return res.json(null)
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId) // req.userId comes from loginRequired middleware

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
      const user = await User.findByPk(req.userId) // req.userId comes from loginRequired middleware
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

export default new UserController()
