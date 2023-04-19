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

      <Footer />
    </Router>
  );
}

export default App;
