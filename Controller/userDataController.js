const { UserDataModel } = require('../Model/userDataModel')
const asyncHandler = require('express-async-handler')

const sendData = asyncHandler(async (req, res) => {
    const { id } = req.jwtPayload;
    // console.log(id)
    const userData = await UserDataModel.findOne({userId: id})
    if (userData) res.status(200).json(userData)
    else res.status(200).json({ mag: "User doesno't exist.", data: false })
})

const storeData = asyncHandler(async (req, res) => {
    const { id } = req.jwtPayload;
    const { playlists, albums, songs } = req.body;

    let removed = false;

    const userData = await UserDataModel.findOne({userId: id})

    if(!userData) return res.status(400).json({msg: "User not exist."}) //////

    const mergeUniqueValue = (currentValue, newValue) => {
        if(currentValue.length ==0 ) {
            return [newValue]
        }

        const dataAvailable = currentValue.find((item) => item.dataId === newValue.dataId)

        if(!dataAvailable) {
            return [...currentValue, newValue]
        } else {
            const removedFromArray = currentValue.filter(item=> item.dataId !== newValue.dataId)
            removed = true;
            return removedFromArray
        }
    }

    // const updateObj = {};
    if (playlists) {
        userData.playlists = mergeUniqueValue(userData.playlists, playlists);
    }
    if (albums) {
        userData.albums = mergeUniqueValue(userData.albums, albums);
    }
    if (songs) {
        userData.songs = mergeUniqueValue(userData.songs, songs);
    }
    // if (playlists) updateObj.playlists = { $each: [playlists] };
    // if (albums) updateObj.albums = { $each: [albums] };
    // if (songs) updateObj.songs = { $each: [songs] };

    const isUpdated = await userData.save()

    if (isUpdated) res.status(200).json({ msg: 'updated', removed })
    else res.status(400).json({ msg: 'error occured' })
})

module.exports = { sendData, storeData }