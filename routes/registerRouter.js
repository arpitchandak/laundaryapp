var express = require('express');
var router = express.Router();
let User = require('../schema/userSchema');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
var jwt = require('../jwt/jwtController');

const LOGIN_TYPE = {
    'mobile': 'L01',
    'email': 'L02',
    'social': 'L03'
};




router.post('/',(req, res, next) => {
    let loginType = req.body.loginType;
    console.log(req.body);
    if (loginType === LOGIN_TYPE.email) {
        let { email, password, contact, name } = req.body;
        console.log("Hello");

        if ((typeof email === 'undefined' || typeof password === 'undefined' || typeof contact === 'undefined'|| typeof name === 'undefined') &&
            (!email || !password || !contact || !name)) {
            return res.status(401).json({ message: 'Enter Required Fields' });
        }

        console.log("Hello user "+email);

        User.find({ email: email }).exec().then( user => {
            console.log(user.length)
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Already Exists'
                });
            } else {
                // jwt token
                
                User.find({contact: contact}).exec().then(user => {
                    if (user.length >= 1) {
                        return res.status(409).json({
                            message: 'Already Exists'
                        });
                    } else {
                        // jwt token
                        
                        let token = jwt.sign(email);
                        // hash of password for db
                        let passHash = bcrypt.hashSync(password, SALT_ROUNDS);
                        // location of user when login // longitude, latitude
                        // Update user model
                        let user_c = new User({
                            name: name,
                            email: email,
                            image: "",
                            contact: contact,
                            password: passHash,
                            jwtToken: token,
                            loc_lat:"",
                            loc_lon:""
                        });
        
                        const result =  user_c.save().then(result => {
                            res.status(201).json({
                                message: 'User Created Successfully!!'
                            })
                        }).catch(err => {
                            return res.status(400).json({
                                message: err.message
                            })
                        })
                    }
                })
            }
        }).catch((err) => {
            return res.status(401).json({
                error: err.message,
                message: 'Auth Failed'
            })
        });
    } else if (loginType === LOGIN_TYPE.mobile) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
});



module.exports = router;