const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Service = new Schema({
    service_name: {
        type: String,
        required: true
    },
   
    // units: {
    //     type: Number,
    //     required: true,
    // },
   
})

const Users = mongoose.model('service_type',Service)

module.exports = Users