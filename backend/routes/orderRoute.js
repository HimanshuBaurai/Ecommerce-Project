const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const {newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder} = require('../controllers/orderController');

router.route('/order/new').post(isAuthenticatedUser, newOrder);//create a new order, and only logged in user can do that
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);//get single order details, and only admin can do that
router.route('/orders/me').get(isAuthenticatedUser, myOrders);//get logged in user orders

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);//get all orders - ADMIN (admin can see all orders
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);//update / process order - ADMIN
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);//delete order - ADMIN


module.exports = router;