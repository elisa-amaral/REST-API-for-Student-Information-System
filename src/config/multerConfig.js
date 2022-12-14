import multer from 'multer'
import { extname, resolve } from 'path'

// makes sure no photo has the same name even if uploaded at exact same millisecond
const random = () => Math.floor(Math.random() * 10000 + 10000)

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Photo type must be either PNG or JPG.'))
    }

    return cb(null, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
      // Date.now gets date as file name, extname extracts extension
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
    },
  }),

}
