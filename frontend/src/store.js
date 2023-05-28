// // Redux is a state management library for JavaScript applications.
// It provides a predictable and centralized way to manage the state of an application, which can become complex as it grows.
// In a Redux - based application, the state of the entire application is stored in a single object, known as the "store".
// The store is updated through actions, which are objects that describe changes to the state.
// These actions are handled by reducers, which are pure functions that take the current state and an action, and return a new state.Redux also provides middleware, which can be used to intercept and modify actions and the state.
// By using Redux, developers can write applications that are easier to test, debug, and maintain, and that have a consistent and predictable data flow.

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer, profileReducer,forgotPasswordReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
