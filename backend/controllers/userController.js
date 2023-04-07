const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");

//reqgister a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'this is a sample id',
            url: 'profilePicUrl'
        }
    });

    sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);//comparePassword is a method in userModel

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
});


/// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    //search for the user having this reset token
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    //password matches then reset it/update it
    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;

    await user.save();//save the updated document

    sendToken(user,200,res);//send the token, and it will be logged in automatically
});