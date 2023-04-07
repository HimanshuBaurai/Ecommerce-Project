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

//get all products(Admin)
exports.getAllProducts = catchAsyncErrors(
    async (req, res, next) => {

        const resultPerPage = 5;
        const productsCount = await Product.countDocuments();

        //for searching
        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const products = await apiFeature.query;

        res.status(200).json({
            success: true,
            products,
            productsCount,
        });
    }
);

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

