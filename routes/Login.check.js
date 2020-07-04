const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')
const httperror = require('http-errors')
const Product = require('../schema/Login.info')
const bcrypt = require('bcrypt');


router.get('/fetchalluser',async (req,res,next) => {
    
    try {
        const result = await Product.find({} , {__v: 0})
        if(!result){
            throw httperror(404, "Database is empty..")
        }
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }

})

router.post('/adduser', (req,res,next) => {

    Product.find({uemail: req.body.uemail})
    .exec()
    .then(user => {
        if (user.length > 1) {
            return res.status(401).json({
                message: "Already a User.. Please Login"
            })
        } 

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.upass, salt, function(err, hash) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                } else {
                    const product = new Product({
                        _id: new mongoose.Types.ObjectId(),
                        uname: req.body.uname,
                        unum: req.body.unum,
                        upass: hash,
                        uemail: req.body.uemail
                    })
                    const result =  product.save().then(result => {
                        res.status(201).json({
                            message: 'User Created Successfully!!'
                        })
                    }).catch(err => {
                        return res.status(400).json({
                            message: err.message
                        })
                    })
                    
                }
            });
        });
    })
    .catch(err => {
        throw httperror(404, err.message)
    })


   
})

router.post('/login',async (req,res,next) => {

    Product.find({uemail: req.body.uemail}) 
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Please Register First !!"
                })
            } 

            bcrypt.compare(req.body.upass, user[0].upass,(err, result)=> {
                if (err) {
                    throw httperror(404, err.message)                    
                }

                if (result) {
                    return res.status(200).json({
                        message: 'Logged In Successfully !!'
                    })
                }else{
                    return res.status(400).json({
                        message: 'Incorrect Password..'
                    })
                }
            })
        })
        .catch(err => {
            throw httperror(404, err.message)
        })
   
})


// router.delete('/:id',async (req,res,next) => {
//     const id = req.params.id
//     try {
//         const result = await Product.findByIdAndDelete(id)
//         if(!result){
//             throw httperror(404, "Invalid Id..")
//         }
//         res.send(result)
//     } catch (error) {
//         console.log(error.message)
//         next(error)
//     }
// })


// router.patch('/:id',async (req,res,next) => {
//     try {
//         const id = req.params.id
//         const update = req.body
//         const options = {new: true}
//         const result = await Product.findByIdAndUpdate(id,update,options)
//         if(!result){
//             throw httperror(500, "Invalid Id..Can't update")
//         }
//         res.send(result)
//     } catch (error) {
//         console.log(error.message)
//         next(error)
//     }})

module.exports = router