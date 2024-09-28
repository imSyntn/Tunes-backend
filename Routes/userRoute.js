const express = require('express');
const { registerUser, authUser, logOutUser } = require('../Controller/userController')

const userRoute = express()

userRoute.route('/').post(registerUser)
userRoute.route('/login').post(authUser)
userRoute.route('/logout').get(logOutUser)

userRoute.route('/').get((req, res) => {
    res.render('../View/signup')
})

userRoute.route('/login').get((req, res) => {
    res.render('../View/login')
})


module.exports = { userRoute }