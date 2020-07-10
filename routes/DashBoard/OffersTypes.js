const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')
const httperror = require('http-errors')
const Product = require('../../schema/DashBoard/OffersSchema')
const bcrypt = require('bcrypt');


router.get('/offers',async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    try {
        const result = await Product.find({} , {__v: 0})
        if(!result){
            res.status(200).json({
                message: true,
                status: status
            })
        }
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }

})

router.post('/offers',async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    try {
        await Product.find({coupon_code: req.body.coupon_code})
        .exec()
        .then(user => {
            if (user.length > 1) {
                return res.status(401).json({
                    message: "Already a Coupon .. "
                })
            } 
        const product = new Product(req.body)
        const result = product.save()
        res.send(result)
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }


   
})




router.delete('/offers/:id',async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    const id = req.params.id
    try {
        const result = await Product.findByIdAndDelete(id)
        if(!result){
            throw httperror(404, "Invalid Id..")
        }
        res.send(result)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})


router.patch('/offers/:id',async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');

    try {
        const id = req.params.id
        const update = req.body
        const options = {new: true}
        const result = await Product.findByIdAndUpdate(id,update,options)
        if(!result){
            throw httperror(500, "Invalid Id..Can't update")
        }
        res.send(result)
    } catch (error) {
        console.log(error.message)
        next(error)
    }})

module.exports = router