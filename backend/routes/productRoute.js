const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);//gives all products
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);//creates new product
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)//updates product
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)//delete product
    .get(getProductDetails);//all have same url so can be cascaded

module.exports = router;