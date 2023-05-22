const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

//create product
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {
        req.body.user = req.user.id;//assigning the user id to the product inorder to keep a track that who created this product

        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    }
);

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage); 

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

//get single product details
exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product,
        });
    }
);


//update Product -- Admin
exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {
        //search for the product via the id provided from the frontend
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }


        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        })
    }
);

//delete product -- Admin
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        //search for the product through id supplied via the frontend
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
);

//Create new review or update review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;//getting the rating,comment and product id from the frontend
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);//finding the product

    const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());//checking if the user has already reviewed the product

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {//if the user has already reviewed the product
                rev.comment = comment;
                rev.rating = rating;
            }
        });
    }
    else {
        product.reviews.push(review);//pushing the review to the reviews array
        product.numOfReviews = product.reviews.length;//updating the number of reviews
    }

    //calculate average of ratings
    let avg = 0;
    product.ratings = product.reviews.forEach(rev => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;//updating the ratings average

    await product.save({ validateBeforeSave: false });//saving the product

    res.status(200).json({
        success: true,
        product
    })
});

//to get all reviews of a single product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

