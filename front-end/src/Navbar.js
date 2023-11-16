import React from 'react';
import "./Navbar.css";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='navbar-header'>
    <div ><h3 >Todo App</h3></div>
    <div>
    <Link to="/" className='link'>Home</Link>
       
        
    </div>
    <div><Link to="/register" className='link'>register/Login</Link></div>
  
</div>
  )
}

export default Navbar;
