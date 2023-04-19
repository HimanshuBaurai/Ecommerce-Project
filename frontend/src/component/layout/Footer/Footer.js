import React from 'react'
import playStore from '../../../images/google-play-png-logo.png'
import appStore from '../../../images/app-store-png-logo-33112.png'
import './Footer.scss';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android And IOS mobile phone</p>
                <img src={playStore} alt='playStore' />
                <img src={appStore} alt='appStore' />
            </div>
            <div className='midFooter'>
                <h1>Ecommerce</h1>
                <p>Quality Top-Notch</p>
                <p>Copyrights 2023 &copy; Himanshu Baurai</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow us on</h4>
                <a href='#'>Instagram</a>
                <a href='#'>Facebook</a>
                <a href='#'>Twitter</a>
            </div>
        </footer>
    )
}

export default Footer