"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required.'],
    })
  }

  const [, token] = authorization.split(' ')

  try {
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET)
    const { id, email } = data

    // checks if payload data is same as user data
    // requires login again if user updates email
    // user must generate new token for new email
    const user = await _User2.default.findOne({
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
