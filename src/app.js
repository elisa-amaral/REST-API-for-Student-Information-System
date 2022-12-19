import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config()

import './database'

import express from 'express'
import cors from 'cors'

import homeRoutes from './routes/homeRoutes'
import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/tokenRoutes'
import studentRoutes from './routes/studentRoutes'
import photoRoutes from './routes/photoRoutes'

const whiteList = [
  'http://localhost:3000', // student information system front-end (React.js)
  'http://localhost:3001', // REST API on localhost
  '*',
]

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Origin not allowed by Cors: ${origin}`))
    }
  },
}

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors(corsOptions))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')))
  }

  routes() {
    this.app.use('/', homeRoutes)
    this.app.use('/users', userRoutes)
    this.app.use('/tokens', tokenRoutes)
    this.app.use('/students', studentRoutes)
    this.app.use('/photos', photoRoutes)
  }
}

export default new App().app
