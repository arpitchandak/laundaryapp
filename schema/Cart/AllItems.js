const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AllDataSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true,
        unique: true
    },
    service_type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    for: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    // units: {
    //     type: Number,
    //     required: true,
    // },
   
})

const Users = mongoose.model('all_item',AllDataSchema)

module.exports = Users