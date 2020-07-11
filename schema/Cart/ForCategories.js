const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema({
    category_name: {
        type: String,
        required: true
    },
   
    // units: {
    //     type: Number,
    //     required: true,
    // },
   
})

const Users = mongoose.model('for_category',Category)

module.exports = Users