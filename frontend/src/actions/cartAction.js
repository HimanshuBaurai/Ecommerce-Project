import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);//get product by id

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,//product id
            name: data.product.name,//product name
            price: data.product.price,//product price
            image: data.product.images[0].url,//product image
            stock: data.product.Stock,//product stock
            quantity,//product quantity
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    //save cart items to local storage, so it doesn't get deleted on page refresh
}

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};