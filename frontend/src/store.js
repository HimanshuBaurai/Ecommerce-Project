// // Redux is a state management library for JavaScript applications.
// It provides a predictable and centralized way to manage the state of an application, which can become complex as it grows.
// In a Redux - based application, the state of the entire application is stored in a single object, known as the "store".
// The store is updated through actions, which are objects that describe changes to the state.
// These actions are handled by reducers, which are pure functions that take the current state and an action, and return a new state.Redux also provides middleware, which can be used to intercept and modify actions and the state.
// By using Redux, developers can write applications that are easier to test, debug, and maintain, and that have a consistent and predictable data flow.

import { createStore, combineReducers, applyMiddleware } from 'redux';//redux
import thunk from 'redux-thunk';//middleware
import { composeWithDevTools } from 'redux-devtools-extension';//redux devtools

// import { productDetailsReducer, productReducer, newProductReducer, newReviewReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';//reducers
// import { userReducer, profileReducer, forgotPasswordReducer } from './reducers/userReducer';//reducers
// import { cartReducer } from './reducers/cartReducer';//reducers
// import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

// const reducer = combineReducers({
//     products: productsReducer,
//     productDetails: productDetailsReducer,
//     user: userReducer,
//     profile: profileReducer,
//     forgotPassword: forgotPasswordReducer,
//     cart: cartReducer,
//     newOrder: newOrderReducer,
//     myOrders: myOrdersReducer,
//     orderDetails: orderDetailsReducer,
//     allOrders: allOrdersReducer,
//     order: orderReducer,
//     newReview:newProductReducer,
// });//combine all reducers
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
} from "./reducers/productReducer";

import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    //we have to set initial state for cartItems, otherwise it will be null
    //we have to parse it to JSON, because we saved it as a string
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
};//initial state

const middleware = [thunk];//middleware

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);//create store

export default store;//export store
