const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Service = new Schema({
    service_name: {
        type: String,
        required: true,
    },   
    img: {
        type: String,
        required: true,
    },   
})

const Users = mongoose.model('dashboard/service_type',Service)

module.exports = Users