var express = require('express');
var router = express.Router();
let User = require('../schema/userSchema');
let bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {
    let { email, password } = req.body;
    let user = await User.find({ "email": email }).exec();

    console.log(email)
    if (user.length < 1) {
        return res.status(401).json({
            message: 'Please Register First'
        });
    }
    bcrypt.compare(password, user[0].password,(err, result)=> {
        if (err) {
            throw httperror(404, err.message)                    
        }

        if (result) {
            return res.status(200).json({
                message: 'Logged In Successfully !!'+result
            })
        }else{
            return res.status(400).json({
                message: 'Incorrect Password..'
            })
        }
    })
});


module.exports = router;