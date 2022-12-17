const Advertisment = require('../models/Advertisment')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const locations = require('../data/locations')

//@desc Add
//@route POST /ads
//@access Private
const add = asyncHandler(async (req, res) => {

  const { title, location, description, currency, price } = req.body

  const date = new Date().toISOString()
  const owner = req.userId

  if (!owner) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  if (!title || !location || !description || !date || !currency || !price) {
    return res.status(400).json({ message: 'Деякі поля слід заповнити' })
  }


  if (title.length < 8) {
    return res.status(400).json({ message: 'Назва оголошення надто коротка' })
  }

  if (title.length > 50) {
    return res.status(400).json({ message: 'Назва оголошення надто довга' })
  }

  if (description.length < 80) {
    return res.status(400).json({ message: 'Опис оголошення надто короткий' })
  }

  if (description.length > 9000) {
    return res.status(400).json({ message: 'Опис оголошення надто довгий' })
  }

  if (!locations.includes(location)) {
    return res.status(400).json({ message: 'Область вказано невірно' })
  }

  if (price > 1000000) {
    return res.status(400).json({ message: 'Введіть корректну ціну' })
  }
  if (currency !== 'UAH' && currency !== 'USD' && currency !== 'EUR') {
    return res.status(400).json({ message: 'Валюту вказано невірно' })
  }

  //Checking for verified account
  if (req.verified) {
    return res.status(403).json({ message: 'Ваш аккаунт має бути верифікований' })
  }

  const result = await Advertisment.create({
    title,
    location,
    description,
    date,
    owner,
    price,
    currency
  }).catch((err) => {
    return res.status(500).send(err)
  })

  res.status(200).json(result)
})

//@desc Delete
//@route DELETE /ads
//@access Private

const deleteAd = asyncHandler(async (req, res) => {
  const { id } = req.body


  if (!id) {
    return res.status(400).json({ message: "Відсутній ідентифікатор" })
  }

  const foundAd = await Advertisment.findById(id).exec()

  if (!foundAd) {
    return res.status(404).json({ message: 'Оголошення не знайдено' })
  }

  if (req.userId !== foundAd.owner) {
    return res.status(403).json({ message: "Оголошення не належить данному обліковому запису" })
  }

  const result = await foundAd.delete()
  res.status(200).json(result)
})

//@desc Update
//@route PUT /ads
//@access Private

const update = asyncHandler(async (req, res) => {
  const { id, title, location, description, currency, price } = req.body

  //Validating fields
  if (!id) {
    return res.status(400).json({ message: 'Відсутній ідентифікатор' })
  }

  if (title?.length < 8) {
    return res.status(400).json({ message: 'Назва оголошення надто коротка' })
  }

  if (title?.length > 50) {
    return res.status(400).json({ message: 'Назва оголошення надто довга' })
  }

  if (description?.length < 80) {
    return res.status(400).json({ message: 'Опис оголошення надто короткий' })
  }

  if (description?.length > 9000) {
    return res.status(400).json({ message: 'Опис оголошення надто довгий' })
  }

  if (location && !locations.includes(location)) {
    return res.status(400).json({ message: 'Область вказано невірно' })
  }

  if (price && price > 1000000) {
    return res.status(400).json({ message: 'Введіть корректну ціну' })
  }
  if (currency && currency !== 'UAH' && currency !== 'USD' && currency !== 'EUR') {
    return res.status(400).json({ message: 'Валюту вказано невірно' })
  }

  const foundAd = await Advertisment.findById(id).exec()

  if (!foundAd) {
    return res.status(404).json({ message: 'Оголошення не знайдено' })
  }

  if (req.userId !== foundAd.owner) {
    return res.status(403).json({ message: "Оголошення не належить данному обліковому запису" })
  }

  if (title) foundAd.title = title
  if (location) foundAd.location = location
  if (description) foundAd.description = description
  if (currency) foundAd.currency = currency
  if (price) foundAd.price = price

  const result = await foundAd.save()

  res.status(200).json(result)

})

//@desc GetMyAds
//@route GET /ads/my-ads
//@access Private

const getMyAds = asyncHandler(async (req, res) => {
  const { page } = req.query || 0
  const userId = req.userId

  const adsPerPage = 10

  const adsCount = await Advertisment.find({ owner: userId }).count()

  const foundAds = await Advertisment.find({ owner: userId })
    .select('-owner -__v').sort({ $natural: -1 }).skip(page * adsPerPage).limit(adsPerPage).lean().exec()

  res.status(200).header({ Quantity: adsCount }).json(foundAds)
})

//@desc SingleAd
//@route GET /ads/single-ad
//@access Public

const getSingleAd = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Відсутній ідентифікатор' })
  }

  const foundAd = await Advertisment.findById(id).lean().exec()

  if (!foundAd) {
    return res.status(404).json({ message: 'Оголошення не знайдено' })
  }

  res.status(200).json(foundAd)
})

//@desc Latest Ads
//@route GET /ads/latest
//@access Public

const getLatestAds = asyncHandler(async (req, res) => {
  const { page } = req.query || 0

  const adsPerPage = 10

  const adsCount = await Advertisment.find().count()

  const foundAds = await Advertisment.find()
    .select('-owner -__v').sort({ $natural: -1 }).skip(page * adsPerPage).limit(adsPerPage).lean().exec()

  res.status(200).header({ Quantity: adsCount }).json(foundAds)
})

//@desc Fav Ads
//@route GET /ads/favs
//@access Private

const getFavAds = asyncHandler(async (req, res) => {
  const { page } = req.query || 0

  const adsPerPage = 1

  const user = req.userId

  const foundUser = await User.findById(user).lean().exec()

  if (!foundUser) {
    return res.sendStatus(403).json({ message: "Forbidden" })
  }

  const favsCount = await Advertisment.find({ _id: { $in: foundUser.favourites } }).count()

  const favourites = await Advertisment.find({ _id: { $in: foundUser.favourites } })
    .select('-owner -__v').sort({ $natural: -1 }).skip(page * adsPerPage).limit(adsPerPage).lean().exec()



  res.status(200).header({ Quantity: favsCount }).json(favourites)
})

//@desc toggleLikeAd
//@route POST /ads/like
//@access Private

const toggleLikeAd = asyncHandler(async (req, res) => {
  const { id } = req.body
  const foundUser = await User.findById(req.userId).exec()

  if (!foundUser) {
    return res.sendStatus(403).json({ message: "Forbidden" })
  }

  let newFavourites = []

  if (foundUser.favourites.includes(id)) {
    newFavourites = foundUser.favourites.filter(item => item !== id)
  }

  if (!foundUser.favourites.includes(id)) {
    newFavourites = [...foundUser.favourites, id]
  }

  foundUser.favourites = newFavourites

  const result = await foundUser.save()

  res.status(200).json(result)
})

module.exports = { add, deleteAd, update, getMyAds, getSingleAd, getLatestAds, getFavAds, toggleLikeAd }