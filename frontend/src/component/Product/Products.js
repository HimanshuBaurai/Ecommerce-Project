import React, { useEffect, useState } from 'react'
import './Products.scss'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from 'react-js-pagination'

const Products = ({ match }) => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);

    return (
        <>
            {
                loading ? <Loader /> : (
                    <>
                        <h2 className='productsHeading'>Products</h2>
                        <div className='products'>
                            {
                                products && products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>

                        {/* show pagination when the products are greater than the result per page */}
                        {
                            resultPerPage < productsCount && (
                                <div className='paginationBox'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={'Next'}
                                        prevPageText={'Prev'}
                                        firstPageText={'First'}
                                        lastPageText={'Last'}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activeClass='pageItemActive'
                                        activeLinkClass='pageLinkActive'
                                    />
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default Products