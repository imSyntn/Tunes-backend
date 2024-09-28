const { sendData, storeData } = require('../Controller/userDataController');

const userDataRoute = require('express')();

userDataRoute.route('/').post(storeData)
userDataRoute.route('/').get(sendData)

// userDataRoute.route('/').get((req, res)=> {
//     res.render('../View/dataStore')
// })

module.exports = { userDataRoute }