const express = require('express');//importing express
const app = express(); //initializing express
const cookieParser = require('cookie-parser');//to parse the cookies
const bodyParser=require('body-parser');//to parse the body of the request
const fileUpload=require('express-fileupload');//to upload files

const errorMiddleware = require('./middleware/error');//importing error middleware

app.use(express.json());//to parse json data
app.use(cookieParser());//to parse cookies
app.use(bodyParser.urlencoded({extended:true}));//to parse the body of the request
app.use(fileUpload());//to upload files

//Routes import
const product = require('./routes/productRoute');
const user=require('./routes/userRoute');
const order=require('./routes/orderRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleWare to handle errors
app.use(errorMiddleware);

module.exports = app;