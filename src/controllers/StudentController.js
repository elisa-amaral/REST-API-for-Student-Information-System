import Student from '../models/Student'
import Photo from '../models/Photo'

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'first_name', 'email', 'last_name', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    })
    res.json(students)
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body)
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

      const student = await Student.findByPk(id, {
        attributes: ['id', 'first_name', 'email', 'last_name', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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

      const student = await Student.findByPk(id)

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

      const student = await Student.findByPk(id)

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

export default new StudentController()
