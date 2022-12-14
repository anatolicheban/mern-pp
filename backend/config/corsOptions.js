const whiteList = require('./whiteList')

const corsOptions = {
  origin: (origin, cb) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions