const express = require('express')
const mongoose = require('mongoose')
const httperror = require('http-errors')
const app = express()

const dotenv = require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: process.env.USERNM,
    pass: process.env.PASS,
    dbName: process.env.DB_NAME
})
.then( () => {
    console.log('mongodb connected...')
})
.catch( err => console.log(err.message)) //jab apn nai network access mai koi whitelist ipaddress ya anywhere ip address nh idaala ho mongodb atlas database mai

const LoginRoute = require('./routes/Login.check')
const AllDataRoute = require('./routes/Cart/AllDataRoute')
const SlidersRoutes = require('./routes/DashBoard/SlidersRoutes')
const OurServices = require('./routes/DashBoard/OurServices')
const OffersTypes = require('./routes/DashBoard/OffersTypes')



// Enable cors
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update later
    // Allowed headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Allowed request methods
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    next();
});



app.use('/',LoginRoute)
app.use('/cart',AllDataRoute)
app.use('/dashboard',SlidersRoutes)
app.use('/dashboard',OurServices)
app.use('/dashboard',OffersTypes)

app.use((req,res,next) => {
    next(httperror(400, "Not Found"))
 })

 app.use((error,req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, x-user-pathway, x-mongo-key, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
   
    res.status(error.status || 500 )
    res.send({
        error:{
            status: error.status || 500,
            message: error.message
        }
    })
 })

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})