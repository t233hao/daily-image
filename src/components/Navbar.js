import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav'>
            <span className="logo">Daily Poetry Images</span>
            <ul className="navbar">
                <li className="navbar-item"><Link to="/">All Images</Link></li>
                <li className="navbar-item"><Link to="https://github.com/t233hao/daily-image">GitHub</Link></li>
                {/* <li className="navbar-item"><Link to="/rss">Rss Feed</Link></li> */}
            </ul>
        </nav>
    );
};

export default Navbar;