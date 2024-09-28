const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '30d'
    })
}

const varifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = { generateToken, varifyToken }