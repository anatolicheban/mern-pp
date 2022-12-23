const jwt = require('jsonwebtoken')
const User = require('../models/User')

const checkUser = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next()
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return next()
      const foundUser = await User.findById(decoded.UserInfo.userId)
      if (!foundUser) return next()
      req.userId = decoded.UserInfo.userId

      next()
    }
  )
}

module.exports = checkUser