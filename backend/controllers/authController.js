const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

//@desc register
//@route POST /auth/register
//@access Public

const register = asyncHandler(async (req, res) => {
  const { username, password, duplPassword, email } = req.body;

  const registrationDate = new Date().toLocaleDateString()

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Заповніть, будь-ласка, усі поля' })
  }

  if (username.length < 8) {
    return res.status(400).json({ message: "Ім'я користувача занадто коротке" })
  }

  if (username.length > 20) {
    return res.status(400).json({ message: "Ім'я користувача занадто довге" })
  }

  if (password.length < 12) {
    return res.status(400).json({ message: "Пароль занадто короткий" })
  }

  if (password.length > 24) {
    return res.status(400).json({ message: "Пароль занадто довгий" })
  }

  if (password !== duplPassword) {
    return res.status(400).json({ message: "Паролі не співпадають" })
  }

  const duplicateUsername = await User.findOne({ username }).lean().exec()

  if (duplicateUsername) {
    return res.status(400).json({ message: "Ім'я користувача зайняте" })
  }

  const duplicateEmail = await User.findOne({ email }).lean().exec()

  if (duplicateEmail) {
    return res.status(400).json({ message: "Емейл зайнятий" })
  }

  //Encrypting password
  const encryptedPwd = await bcrypt.hash(password, 10)


  const result = await User.create({
    username, password: encryptedPwd, email, registrationDate
  })

  console.log(result);

  res.status(200).json({ message: `Користувача ${username} було успішно зареєстровано` })
})

//@desc login
//@route POST /auth/login
//@access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Заповніть усі поля!' })
  }

  const foundUser = await User.findOne({ username }).lean().exec()

  if (!foundUser) {
    return res.status(401).json({ message: "Неправильне ім'я користувача або пароль" })
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) {
    return res.status(401).json({ message: "Неправильне ім'я користувача або пароль" })
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id,
        verified: foundUser.verified,
        isAdmin: foundUser.isAdmin
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { userId: foundUser._id, },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // Create secure cookie with refresh token 
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    // secure: true, //https
    // sameSite: 'None', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  })

  // Send accessToken containing username and roles 
  res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if (!cookies.jwt) return res.status(401).json({ message: 'Увійдіть в систему' })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      const foundUser = await User.findById(decoded.userId).lean().exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id,
            verified: foundUser.verified,
            isAdmin: foundUser.isAdmin
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.json({ accessToken })
    })
  )
})

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, /*sameSite: 'None',secure: true */ })
  res.json({ message: 'Cookie cleared' })
}


module.exports = { register, login, refresh, logout }