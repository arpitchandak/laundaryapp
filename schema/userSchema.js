const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    image: String,
    contact: {
        type: String,
        unique: true
    },
    password: String,
    jwtToken: String,
    loc_lat: String,
    loc_lon: String
});

module.exports = mongoose.model('users', userSchema);