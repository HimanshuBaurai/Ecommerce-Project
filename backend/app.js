const express = require('express');//importing express
const app = express(); //initializing express
const cookieParser = require('cookie-parser');//to parse the cookies
const bodyParser = require('body-parser');//to parse the body of the request
const fileUpload = require('express-fileupload');//to upload files
// const dotenv = require('dotenv');
const path=require("path");

const errorMiddleware = require('./middleware/error');//importing error middleware

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'backend/config/config.env' });
}


app.use(express.json());//to parse json data
app.use(cookieParser());//to parse cookies
app.use(bodyParser.urlencoded({ extended: true }));//to parse the body of the request
app.use(fileUpload());//to upload files

//Routes import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleWare to handle errors
app.use(errorMiddleware);

module.exports = app;