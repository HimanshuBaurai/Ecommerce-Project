const app = require('./app');

const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connnectDatabase = require('./config/database');

//Handling uncaught Exception, like if at any place we have console.log(youtube) and youtube is not defined, so this is know as uncaught exception and we exit process
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    //exit process
    process.exit(1);
});

//config
dotenv.config({ path: 'backend/config/config.env' });

//connect to database
connnectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`);
});


//unhandled promise rejection--> when mongo url is wrong/invalid
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
    //and when we encounter this error we want to close the server and exit the process
    server.close(() => {
        process.exit(1);
    });
});
