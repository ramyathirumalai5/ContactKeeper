import React, { Fragment, useContext } from 'react';
 
import { Link } from 'react-router-dom';
import authContext from '../../context/Auth/authContext';
import ContactContext from '../../context/contact/contactContext';
 
const Navbar = ({ title, icon }) => {
  const AuthContext = useContext(authContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logout, user} = AuthContext;
  
  
  const onLogout = () => {
    logout();
    contactContext.clearContacts();
    
  };
 
  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">{/* It's telling the browser that when that link is clicked, it should scroll the page to the anchor !. Because there is no such anchor on the page, the page doesn't move. Even if you take out the href the code works perfectly */}
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
 
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
 
  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/login'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};
export default Navbar;
