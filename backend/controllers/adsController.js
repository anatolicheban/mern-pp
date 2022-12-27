const Advertisment = require('../models/Advertisment')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const locations = require('../data/locations')
const { default: mongoose } = require('mongoose')
const adCategories = require('../data/adCategories')

//@desc Add
//@route POST /ads
//@access Private
const add = asyncHandler(async (req, res) => {

  const { title, location, description, categories, currency, price, images } = req.body
  console.log(req.files);
  console.log(images);
  console.log(categories);

  const date = new Date().toLocaleDateString()
  const owner = req.userId

  if (!title || !location || !description || !date || !currency || !price) {
    return res.status(400).json({ message: 'Деякі поля слід заповнити' })
  }


  if (title.trim().length < 8) {
    return res.status(400).json({ message: 'Назва оголошення надто коротка' })
  }
  if (title.trim().length > 50) {
    return res.status(400).json({ message: 'Назва оголошення надто довга' })
  }

  if (description.trim().length < 80) {
    return res.status(400).json({ message: 'Опис оголошення надто короткий' })
  }
  if (description.trim().length > 9000) {
    return res.status(400).json({ message: 'Опис оголошення надто довгий' })
  }

  if (!locations.includes(location)) {
    return res.status(400).json({ message: 'Область вказано невірно' })
  }

  if (price > 1000000 || price < 0) {
    return res.status(400).json({ message: 'Введіть корректну ціну' })
  }
  if (currency !== 'UAH' && currency !== 'USD' && currency !== 'EUR') {
    return res.status(400).json({ message: 'Валюту вказано невірно' })
  }

  if (!categories.every(item => {
    return adCategories.includes(item)
  })) {
    return res.status(400).json({ message: 'Категорії вказано невірно' })
  }



  //Checking for verified account
  // if (req.verified) {
  //   return res.status(403).json({ message: 'Ваш аккаунт має бути верифікований' })
  // }


  const result = await Advertisment.create({
    title,
    location,
    description,
    date,
    owner,
    price,
    currency,
    categories
  }).catch((err) => {
    return res.status(500).send(err)
  })

  res.status(200).json({ id: result._id })
})

//@desc Delete
//@route DELETE /ads
//@access Private

const deleteAd = asyncHandler(async (req, res) => {
  const { id } = req.body


  if (!id) {
    return res.status(400).json({ message: "Відсутній ідентифікатор" })
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Некорректний ідентифікатор" })
  }


  const foundAd = await Advertisment.findById(id).exec()

  if (!foundAd) {
    return res.status(404).json({ message: 'Оголошення не знайдено' })
  }

  if (req.userId !== foundAd.owner) {
    return res.status(403).json({ message: "Оголошення не належить данному обліковому запису" })
  }

  const result = await foundAd.delete()
  res.status(200).json({ message: `Оголошення з ID: ${id} видалено` })
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

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Некорректний ідентифікатор" })
  }


  if (title?.trim().length < 8) {
    return res.status(400).json({ message: 'Назва оголошення надто коротка' })
  }

  if (title?.trim().length > 50) {
    return res.status(400).json({ message: 'Назва оголошення надто довга' })
  }

  if (description?.trim().length < 80) {
    return res.status(400).json({ message: 'Опис оголошення надто короткий' })
  }

  if (description?.trim().length > 9000) {
    return res.status(400).json({ message: 'Опис оголошення надто довгий' })
  }

  if (location && !locations.includes(location)) {
    return res.status(400).json({ message: 'Область вказано невірно' })
  }

  if (price && (price > 1000000 || price < 0 || typeof price !== 'number')) {
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

  res.status(200).json({ id: result._id })

})

//@desc GetMyAds
//@route GET /ads/my-ads
//@access Private

const getMyAds = asyncHandler(async (req, res) => {
  const { page } = req.query || 0
  const userId = req.userId

  const adsPerPage = 5

  const adsCount = await Advertisment.find({ owner: userId }).count()

  const foundAds = await Advertisment.find({ owner: userId })
    .select('-owner -__v').sort({ $natural: -1 }).skip((page - 1) * adsPerPage).limit(adsPerPage).lean().exec()

  let pages = adsCount / adsPerPage

  if (pages % 1 !== 0) {
    pages = Math.floor(pages) + 1
  }

  const foundUserFavs = await User.findById(req.userId).select('favourites').lean().exec()

  const foundAdsWithLikes = foundAds.map(item => {
    if (foundUserFavs.favourites.includes(item._id.toString())) {
      return { ...item, isLiked: true }
    }
    console.log(item.isLiked);
    return { ...item, isLiked: false }
  })

  const response = {
    ads: foundAdsWithLikes,
    pages
  }

  res.status(200).json(response)
})

//@desc SingleAd
//@route GET /ads/single-ad
//@access Public

const getSingleAd = asyncHandler(async (req, res) => {
  const { id } = req.params


  if (!id) {
    return res.status(400).json({ message: 'Відсутній ідентифікатор' })
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Некорректний ідентифікатор" })
  }


  const foundAd = await Advertisment.findById(id).lean().exec()

  if (!foundAd) {
    return res.status(404).json({ message: 'Оголошення не знайдено' })
  }

  const adOwner = await User.findById(foundAd.owner).lean().exec()

  if (!adOwner) {
    return res.status(404).json({ message: 'Власника не оголошення не знайдено, тому воно недійсне' })
  }

  const response = {
    ...foundAd,
    ownerUsername: adOwner.username,
    ownerEmail: adOwner.email,
    ownerRegDate: adOwner.registrationDate
  }


  res.status(200).json(response)
})

//@desc Latest Ads
//@route GET /ads/latest
//@access Public

const getLatestAds = asyncHandler(async (req, res) => {
  const { page } = req.query || 1

  const adsPerPage = 5

  const adsCount = await Advertisment.find().count()

  const foundAds = await Advertisment.find()
    .select('-owner -__v').sort({ $natural: -1 }).skip((page - 1) * adsPerPage).limit(adsPerPage).lean().exec()

  let pages = adsCount / adsPerPage

  if (pages % 1 !== 0) {
    pages = Math.floor(pages) + 1
  }


  const { userId } = req.query

  console.log('UserID: ', userId);

  if (userId) {
    const foundUserVavs = await User.findById(userId).select('favourites').lean().exec()
    const foundAdsWithLikes = foundAds.map(item => {
      if (foundUserVavs.favourites.includes(item._id.toString())) {
        return { ...item, isLiked: true }
      }
      return { ...item, isLiked: false }
    })

    let response = {
      ads: foundAdsWithLikes,
      pages
    }
    return res.status(200).json(response)
  }

  let response = {
    ads: foundAds,
    pages
  }

  res.status(200).json(response)
})

//@desc Fav Ads
//@route GET /ads/favs
//@access Private

const getFavAds = asyncHandler(async (req, res) => {
  const { page } = req.query || 0

  const adsPerPage = 5

  const user = req.userId

  const foundUser = await User.findById(user).lean().exec()

  if (!foundUser) {
    return res.status(403).json({ message: "Forbidden" })
  }

  const favsCount = await Advertisment.find({ _id: { $in: foundUser.favourites } }).count()

  let favourites = await Advertisment.find({ _id: { $in: foundUser.favourites } })
    .select('-owner -__v').sort({ $natural: -1 }).skip((page - 1) * adsPerPage).limit(adsPerPage).lean().exec()


  let pages = favsCount / adsPerPage

  if (pages % 1 !== 0) {
    pages = Math.floor(pages) + 1
  }

  favourites = favourites.map(item => ({ ...item, isLiked: true }))


  res.status(200).json({ ads: favourites, pages })
  console.log('Sent!');
})

//@desc toggleLikeAd
//@route POST /ads/like
//@access Private

const toggleLikeAd = asyncHandler(async (req, res) => {
  const { id } = req.body
  const foundUser = await User.findById(req.userId).exec()

  if (!id) {
    return res.status(400).json({ message: "Некорректний ідентифікатор" })
  }

  //ВАЖНО ЗАПОМНИТЬ!!!!
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Некорректний ідентифікатор" })
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