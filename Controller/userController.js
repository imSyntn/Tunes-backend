const asyncHandler = require('express-async-handler')
const { User } = require('../Model/userModel')
const { generateToken, varifyToken } = require('../Utils/jwtTokens');
const { UserDataModel } = require('../Model/userDataModel');



const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        return res.status(400).json({ msg: "User exist." })
    }

    const user = await User.create({ email, password })

    if (user) {

        const createUserData = await UserDataModel.create({ userId: user.id, songs: [], albums: [], playlists: [] })

        const token = generateToken({
            id: user._id,
            email: user.email,
        })
        res.status(201)
            .cookie('uid', token, {
                httpOnly: false,
                secure: true,
                sameSite: 'None'
            })
            .json({
                id: user._id,
                email: user.email,
                uid: token
            })
    }
})

const authUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.uid;

    const { email, password } = req.body;

    if (token && !email && !password) {
        const jwt = varifyToken(token)
        const isUserExist = await User.findById(jwt.id)
        if(jwt && isUserExist) {
            // const isUserExist = await User.findOne({ jwt })
            return res.status(201).json({ ...jwt, loggedIn: true })
        } else {
            return res.json({msg: 'Cookie is not valid'})
        }
    }


    const user = (email && password) ? await User.findOne({ email }) : undefined;

    if (user && (user.matchPassword(password))) {

        const token = generateToken({
            id: user._id,
            email: user.email,
        })

        res.status(201)
            .cookie('uid', token, {
                httpOnly: false, // Accessible only by web server
                secure: true, // HTTPS only in production
                sameSite: 'None'
            })
            .json({
                id: user._id,
                email: user.email,
                loggedIn: true,
                uid: token

            })
    } else {
        res.status(400).json({ msg: "Invalid email or password." })
    }
})

const logOutUser = (req, res) => {
    res.clearCookie('uid').status(200).json({ msg: 'Logged out successfully' })
}

module.exports = { registerUser, authUser, logOutUser }