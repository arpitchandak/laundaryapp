const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slider = new Schema({
    img: {
        type: String,
        required: true,
    },   
})

const Users = mongoose.model('dashboard/slider',Slider)

module.exports = Users