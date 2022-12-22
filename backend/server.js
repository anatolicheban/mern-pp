require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger, logEvents } = require('./middleware/logger')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const authRoutes = require('./routes/authRoutes')
const adsRoutes = require('./routes/adsRoutes')
const upload = require('multer')()
const userRoutes = require('./routes/userRoutes')
const PORT = process.env.PORT || 3500

const app = express()

connectDB()

//middleware
// app.use(logger)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(upload.array())

//Routes
app.use('/auth', authRoutes)
app.use('/ads', adsRoutes)
app.use('/user', userRoutes)

//DB connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
})

mongoose.connection.on('error', err => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})