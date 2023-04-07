const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
        minLength: [4, 'Your name must be atleast 4 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password must be atleast 8 characters long'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();//if password is not modified, then next
    }
    this.password = await bcrypt.hash(this.password, 10);//10 is the salt
});

//JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME, });//jwt.sign(payload, secretOrPrivateKey, [options, callback])
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);//this.password is the password in the database
};

//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');//generate random token

    //Hash and set to resetPasswordToken
    const tokenCrypto = crypto.createHash('sha256').update(resetToken).digest('hex');//encrypt token
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;//set expire time to 15minutes
    this.resetPasswordToken = tokenCrypto;//set token

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);//exporting userSchema