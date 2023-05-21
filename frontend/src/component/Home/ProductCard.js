import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'



const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.5)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,//size of stars
        isHalf: true,//for decimal values of rating else it consider only integral part
        value: product.ratings,
    }

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span> ({product.numOfReviews} Reviews) </span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard