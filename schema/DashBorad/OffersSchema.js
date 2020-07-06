const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Coupon = new Schema({
    offer_name: {
        type: String,
        required: true,
    },   
    img: {
        type: String,
        required: true,
    },
    coupon_code: {
        type: String,
        required: true,
        unique: true
    },    
    valid_till: {
        type: String,
        required: true,
    },   
})

const Users = mongoose.model('dashboard/offers',Coupon)

module.exports = Users