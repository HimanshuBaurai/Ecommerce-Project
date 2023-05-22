import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import './Home.scss'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js'//temp component for work , as we would be fetching products when we implemet redux
import { clearErrors, getProducts } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'

const Home = () => {
    const alert = useAlert()//to use alert
    const dispatch = useDispatch()//to dispatch actions
    const { loading, error, products } = useSelector(state => state.products)//to get the state from redux store

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts())
    }, [dispatch, error, alert])

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        {/* sets the title of the page */}
                        <MetaData title='ECOMMERCE' />

                        <div className='banner'>
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>

                            <a href='#container'>
                                <button >
                                    Explore <CgMouse />
                                </button>
                            </a>
                        </div>

                        <h2 className='homeHeading'>Featured Products</h2>

                        <div className='container' id='container'>
                            {
                                products && products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Home
