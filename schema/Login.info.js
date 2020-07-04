const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginDataSchema = new Schema({
    uname: {
        type: String,
        required: true
    },
    unum: {
        type: String,
        required: true,
        unique: true
    },
    upass: {
        type: String,
        required: true
    },
    uemail: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
   
})

const Users = mongoose.model('our_user',LoginDataSchema)

module.exports = Users