const router = require('express').Router()
const { add, deleteAd, update, getMyAds, getSingleAd, getLatestAds, getFavAds, toggleLikeAd } = require('../controllers/adsController')
const verifyJWT = require('../middleware/verifyJWT')
const reqLimiter = require('../middleware/reqLimiter')
const checkUser = require('../middleware/checkUser')

router.use(reqLimiter)

router.route('/')
  .post(verifyJWT, add)
  .delete(verifyJWT, deleteAd)
  .put(verifyJWT, update)

router.route('/my-ads')
  .get(verifyJWT, getMyAds)

router.route('/single-ad/:id')
  .get(getSingleAd)

router.route('/latest')
  .get(getLatestAds)

router.route('/favs')
  .get(verifyJWT, getFavAds)

router.route('/like')
  .post(verifyJWT, toggleLikeAd)
module.exports = router