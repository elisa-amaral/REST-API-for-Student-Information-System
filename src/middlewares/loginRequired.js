import jwt from 'jsonwebtoken'
import User from '../models/User'

export default async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required.'],
    })
  }

  const [, token] = authorization.split(' ')

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET)
    const { id, email } = data

    // checks if payload data is same as user data
    // requires login again if user updates email
    // user must generate new token for new email
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    })

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user.'],
      })
    }

    req.userId = id
    req.userEmail = email
    return next()
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid or expired token.'],
    })
  }
}
