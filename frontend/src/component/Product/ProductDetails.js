import React, { useEffect, useState } from 'react'
import './ProductDetails.scss'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, newReview } from '../../actions/productAction'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import { clearErrors } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";



const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();//dispatch
    const alert = useAlert();//alert

    const { product, loading, error } = useSelector((state) => state.productDetails);//product details
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const options = {
        readOnly: true,
        size: 'large',
        value: product.ratings,
        precision: 0.5,
    };

    const [quantity, setQuanity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return alert.error('Stock Limit Exceeded');

        const qty = quantity + 1;
        setQuanity(qty);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const qty = quantity - 1;
            setQuanity(qty);
        } else return;
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success('Item Added to Cart');
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);//alert error
            dispatch(clearErrors());//clear errors
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(match.params.id));//get product details
    }, [dispatch, match.params.id, error, alert, reviewError, success]);//use effect

    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <MetaData title={`${product.name} -- ECOMMERCE`} />
                        <div className='ProductDetails'>

                            <div>
                                <Carousel>
                                    {
                                        product.images &&
                                        product.images.map((item, i) => (
                                            <img
                                                className='CarouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        ))
                                    }
                                </Carousel>
                            </div>

                            <div>
                                <div className='detailsBlock-1'>
                                    <h2>{product.name}</h2>
                                    <p>Product #{product._id}</p>
                                </div>

                                <div className='detailsBlock-2'>
                                    <Rating {...options} />
                                    <span>{product.numOfReviews} Reviews</span>
                                </div>

                                <div className='detailsBlock-3'>
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            {/* <input readOnly type="number" value={quantity} />*/}
                                            <p>{quantity}</p>
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button
                                            disabled={product.Stock < 1 ? true : false}
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <p>
                                        Status:
                                        <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                                            {product.Stock < 1 ? 'Out Of Stock' : 'In Stock'}
                                        </b>
                                    </p>
                                </div>

                                <div className='detailsBlock-4'>
                                    Description: <p>{product.description}</p>
                                </div>

                                <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                            </div>
                        </div>

                        <h3 className='reviewsHeading'>REVIEWS</h3>

                        <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {
                            product.reviews && product.reviews[0] ? (
                                <div className='reviews'>
                                    {
                                        product.reviews.map(review => <ReviewCard review={review} />)
                                    }
                                </div>
                            ) : (
                                <p className='noReviews'>No Reviews</p>
                            )
                        }
                    </>
                )
            }
        </>
    );
}

export default ProductDetails
