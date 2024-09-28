const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    songs: {
        type: [{
            dataId: { type: String },
            type: { type: String },
            title: { type: String },
            image: { type: String }
        }],
        default: []
    },
    albums: {
        type: [{
            dataId: { type: String },
            type: { type: String },
            title: { type: String },
            image: { type: String }
        }],
        default: []
    },
    playlists: {
        type: [{
            dataId: { type: String },
            type: { type: String },
            title: { type: String },
            image: { type: String }
        }],
        default: []
    }
})

const UserDataModel = mongoose.model('user-data', userDataSchema)

module.exports = { UserDataModel }