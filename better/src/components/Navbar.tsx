import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

export function Navbar() {
  return (
    <nav className='Navbar'>
        <Link to = "/"></Link>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/recipes">Recipes</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link  to="/contact">Contact</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
