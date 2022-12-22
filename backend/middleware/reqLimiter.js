const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const reqLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 30, // Limit each IP to 5 login requests per `window` per minute
  message:
    { message: 'Забагато запитів з цієї IP адреси' },
  handler: (req, res, next, options) => {
    logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    res.status(options.statusCode).send(options.message)
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = reqLimiter