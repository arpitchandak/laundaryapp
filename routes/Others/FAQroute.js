const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')
const httperror = require('http-errors')
const Product = require('../../schema/Others/FAQschema')
const bcrypt = require('bcrypt');


router.get('/faq',async (req,res,next) => {

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

router.post('/faq',async (req,res,next) => {

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




router.delete('/faq/:id',async (req,res,next) => {

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


router.patch('/faq/:id',async (req,res,next) => {

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