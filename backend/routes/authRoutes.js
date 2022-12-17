const express = require('express')
const router = express.Router()
const { register, login, refresh, logout } = require('../controllers/authController')

router
  .post('/register', register)
  .post('/login', login)
  .get('/refresh', refresh)
  .post('/logout', logout)


module.exports = router