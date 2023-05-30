import React, { useEffect, useState } from 'react'
import './ProductDetails.scss'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import { clearErrors } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'



const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();//dispatch
    const alert = useAlert();//alert

    const { product, loading, error } = useSelector((state) => state.productDetails);//product details

    useEffect(() => {
        if (error) {
            alert.error(error);//alert error
            dispatch(clearErrors());//clear errors
        }
        dispatch(getProductDetails(match.params.id));//get product details
    }, [dispatch, match.params.id, error, alert]);//use effect


    const options = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.5)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,//size of stars
        isHalf: true,//for decimal values of rating else it consider only integral part
        value: product.ratings,
    };//options for rating stars

    const [quantity, setQuanity] = useState(1);

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
                                    <ReactStars {...options} />
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

                                <button className='submitReview'>Submit Review</button>
                            </div>
                        </div>

                        <h3 className='reviewsHeading'>REVIEWS</h3>
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
