const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slider = new Schema({
    name: {
        type: String,
        required: true,
    },  
    content: {
        type: String,
        required: true,
    },   
    img: {
        type: String,
        required: true,
    },
})

const Users = mongoose.model('infoSlider',Slider)

module.exports = Users