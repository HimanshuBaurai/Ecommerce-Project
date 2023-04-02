const app = require('./app');

const dotenv = require('dotenv');
const connnectDatabase = require('./config/database');

//config
dotenv.config({ path: 'backend/config/config.env' });
//connect to database
connnectDatabase();






app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`);
});