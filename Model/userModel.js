const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (req, res, next) {
    if(!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPass) {
    return bcrypt.compare(enteredPass, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = { User }