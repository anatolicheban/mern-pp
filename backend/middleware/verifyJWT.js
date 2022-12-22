const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findById(decoded.UserInfo.userId)
            if (!foundUser) return res.status(403).json({ message: 'Forbidden' })

            req.userId = decoded.UserInfo.userId
            req.verified = decoded.UserInfo.verified
            req.isAdmin = decoded.isAdmin
            next()
        }
    )
}

module.exports = verifyJWT