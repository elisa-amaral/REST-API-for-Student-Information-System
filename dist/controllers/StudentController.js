"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    const students = await _Student2.default.findAll({
      attributes: ['id', 'first_name', 'last_name', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    })
    res.json(students)
  }

  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body)
      return res.json(student)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        })
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'first_name', 'last_name', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      })

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist.'],
        })
      }

      return res.json(student)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        })
      }

      const student = await _Student2.default.findByPk(id)

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist.'],
        })
      }

      const newStudentData = await student.update(req.body)

      return res.json(newStudentData)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        })
      }

      const student = await _Student2.default.findByPk(id)

      if (!student) {
        return res.status(400).json({
          errors: ['Student does not exist.'],
        })
      }

      await student.destroy()
      return res.json({
        studentDeleted: true,
      })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

exports. default = new StudentController()
