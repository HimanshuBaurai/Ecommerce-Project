import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";
import cover from '../../../images/logo.svg'
import { VscAccount } from "react-icons/vsc";
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { BsFillCartCheckFill, BsSearch } from "react-icons/bs";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className='app__navbar'>
      <Link to='/' className='app__navbar-logo'>
        <img src={cover} alt="logo" />
      </Link> 
      <ul className='app__navbar-links'>
        {
          ["home", "products", "contact", "about"].map((item) => (
            <li className='app__flex p-text' key={`link=${item}`}>
              <div />
              {
                item === "home" ?
                  (
                    <a href={`/`}>{item}</a>
                  ) :
                  (<a href={`/${item}`}>{item}</a>)
              }
            </li>
          ))
        }
      </ul>

      <ul className='app__navbar-links'>
        <li className='app__flex p-text'>
          {/* <img src='' href='/search' alt='' /> */}
          <a href='/search' className='options'><BsSearch /></a>
        </li>
        <li className='app__flex p-text'>
          <a href='/cart' className='options'><BsFillCartCheckFill /></a>
        </li>
        <li className='app__flex p-text'>
          <a href='/login' className='options'><VscAccount /></a>
        </li>
      </ul>

      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {/* when toggle is true render the menu block of react */}
        {
          toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {
                  ["home", "products", "contact", "about"].map((item) => (
                    <li className='app__flex p-text' key={`link=${item}`}>
                      {
                        item === "home" ?
                          (
                            <a href={`/`} onClick={() => setToggle(false)}>{item}</a>
                          ) :
                          (<a href={`/${item}`} onClick={() => setToggle(false)}>{item}</a>)
                      }
                    </li>
                  ))
                }
                <li className='app__flex p-text'> 
                  <a href='/search' className='options'><BsSearch />Search</a>
                </li>
                <li className='app__flex p-text'>
                  <a href='/cart' className='options'><BsFillCartCheckFill />Cart</a>
                </li>
                <li className='app__flex p-text'>
                  <a href='/login' className='options'><VscAccount />Account</a>
                </li>
              </ul> 
            </motion.div>
          )
        }
      </div>
    </nav>
  );
};

export default Header;

