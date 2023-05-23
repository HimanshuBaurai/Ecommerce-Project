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



// App Component
function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  return (
    <Router>
      <Header />

      <Route exact path='/' component={Home} />
      <Route exact path='/product/:id' component={ProductDetails} />
      <Route exact path='/products' component={Products} />
      <Route path='/products/:keyword' component={Products} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/login' component={LoginSignUp} />

      <Footer />
    </Router>
  );
}

export default App;
