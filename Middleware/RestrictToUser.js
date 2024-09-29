const { varifyToken } = require('../Utils/jwtTokens')

const RestrictToUser = (req, res, next) => {
    const uid = req.cookies?.uid;

    const validUser = varifyToken(uid)

    if (uid && validUser) {
        req.jwtPayload = validUser;
        next()
    } else {
        res.status(401)
        throw new Error('Invalid token')
    }
}

module.exports = { RestrictToUser }