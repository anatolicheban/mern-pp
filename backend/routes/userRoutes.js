const { getMyProfile } = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')
const router = require('express').Router()
const reqLimiter = require('../middleware/reqLimiter')

router.use(reqLimiter)
router.use(verifyJWT)
router.get('/my-profile', getMyProfile)

module.exports = router