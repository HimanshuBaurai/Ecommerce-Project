import React from 'react'
import { CgMouse } from 'react-icons/all'
import './Home.scss'
import Product from './Product.js'


//temp component for work , as we would be fetching products when we implemet redux
const product = {
    _id: 'himanshu',
    name: 'Nike Slim Shirt',
    price: '$120',
    images: [{ url: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10139231/2019/7/12/819e3149-8817-476c-9f7c-9d7dad22e9381562926754671-Nike-Dri-FIT-Breathe-Strike-7151562926753190-1.jpg' }],
};

const Home = () => {
    return (
        <>
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </>
    )
}

export default Home