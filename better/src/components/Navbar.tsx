import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

export function Navbar() {
  return (
    <nav className='Navbar'>
        <Link to = "/aliment"></Link>
        <ul>
            <li>
                <Link to="/aliment">Home</Link>
            </li>
            <li>
                <Link to="/aliment/recipes">Recipes</Link>
            </li>
            <li>
                <Link to="/aliment/about">About</Link>
            </li>
            <li>
                <Link  to="/aliment/contact">Contact</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
