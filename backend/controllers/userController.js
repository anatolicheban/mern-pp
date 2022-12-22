const asyncHandler = require("express-async-handler");
const Advertisment = require("../models/Advertisment");
const User = require("../models/User");


//@desc Change username
//@route POST /my-profile
//@access Private

const getMyProfile = asyncHandler(async (req, res) => {

  const foundUser = await User.findById(req.userId).select('-__v -password -favourites -lastseen').lean().exec()

  const adsCount = await Advertisment.find({ owner: req.userId }).count()

  if (!foundUser) {
    return res.status(404).json({ message: 'Користувача не знайдено' })
  }

  res.status(200).json({ ...foundUser, adsAmount: adsCount })
})

module.exports = { getMyProfile }
