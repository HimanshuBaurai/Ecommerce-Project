// Import React
import React, { useState, useEffect } from 'react';
// Import React Router
import { BrowserRouter as Router, Route } from "react-router-dom"
// Import WebFont
import WebFont from 'webfontloader';
// Import CSS
import './App.css';

// Import Components
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp.js';
import Profile from './component/User/Profile.js';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';



// App Component
function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
  }, []);

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} /> /**/}
      <Route exact path='/' component={Home} />
      <Route exact path='/product/:id' component={ProductDetails} />
      <Route exact path='/products' component={Products} />
      <Route path='/products/:keyword' component={Products} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/login' component={LoginSignUp} />
      <ProtectedRoute exact path='/account' component={Profile} />
      <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
      <ProtectedRoute exact path='/password/update' component={UpdatePassword} />
      <Route exact path='/password/forgot' component={ForgotPassword} />
      <Route exact path='/password/reset/:token' component={ResetPassword} />
      <Route exact path='/cart' component={Cart} />

      <Footer />
    </Router>
  );
}

export default App;
