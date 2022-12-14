const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logger')

const PORT = process.env.PORT || 3500

const app = express()

app.use(logger)
app.use(cors(corsOptions))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})