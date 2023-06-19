const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, { usenewUrlParser: true, useUnifiedTopology: true })
    .then((data) => console.log(`MongoDB connected with server: ${data.connection.host}`))
}

module.exports = connectDatabase;

// mongodb+srv://himanshu:himanshu23@beyondbuy.yto20ow.mongodb.net/beyondbuyDB?retryWrites=true&w=majority