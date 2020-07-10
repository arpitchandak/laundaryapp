const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    contact: String,
    password: String,
    jwtToken: String,
    loc_lat: String,
    loc_lon: String
});

module.exports = mongoose.model('users', userSchema);