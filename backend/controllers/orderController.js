const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;//destructring

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order,
    });
});




//get single order details
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');//populate user name and email

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404));//if order not found
    }

    res.status(200).json({
        success: true,
        order,
    });
});

//get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });//find order by user id

    res.status(200).json({
        success: true,
        orders,
    });
});

//get all orders - ADMIN
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();//find all orders

    let totalAmount = 0;//total amount of all orders
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

//update order - ADMIN
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404));
    }//if order not found

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }//if order status is delivered, then you can't update it

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);//find product by id
    product.Stock = product.Stock - quantity;//update stock

    await product.save({ validateBeforeSave: false });
}

//delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
});