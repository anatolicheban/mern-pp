const express = require('express')
const router = express.Router()
const { register, login, refresh, logout } = require('../controllers/authController')
const authLimiter = require('../middleware/authLimiter')

router
  .post('/register', authLimiter, register)
  .post('/login', authLimiter, login)
  .get('/refresh', refresh)
  .post('/logout', authLimiter, logout)


module.exports = router