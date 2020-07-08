const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')
const httperror = require('http-errors')
const Product = require('../../schema/DashBorad/SliderSchema')
const bcrypt = require('bcrypt');


router.get('/slider',async (req,res,next) => {
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

router.post('/slider',async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


    try {
        const product = new Product(req.body)
        const result =await product.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
        next(error)
    }


   
})




router.delete('/slider/:id',async (req,res,next) => {
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


router.patch('/slider/:id',async (req,res,next) => {
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