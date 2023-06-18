const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);//gives all products

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);//gives all products for admin page

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);//creates new product
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)//updates product
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);//delete product

router.route("/product/:id").get(getProductDetails);//all have same url so can be cascaded

router.route('/review').put(isAuthenticatedUser, createProductReview);//create/update product review
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);//get product reviews and delete review

module.exports = router;