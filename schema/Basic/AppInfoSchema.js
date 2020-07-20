const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppInfo = new Schema({
    app_name: {
        type: String,
        required: true,
    },  
    app_splash: {
        type: String,
        required: true,
    },   
})

const Users = mongoose.model('appInfo',AppInfo)

module.exports = Users