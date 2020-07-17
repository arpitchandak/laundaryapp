const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Terms = new Schema({
    title: {
        type: String,
        required: true,
    },   
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },    
    
})

const Users = mongoose.model('terms',Terms)

module.exports = Users