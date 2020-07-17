const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FAQ = new Schema({
    question: {
        type: String,
        required: true,
    },   
    answer: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },    
    
})

const Users = mongoose.model('faq',FAQ)

module.exports = Users