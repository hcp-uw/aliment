import React from 'react'
import Navbar from '../components/Navbar';
import './Home.css';
import background from '../food_background.png';

export function Home() {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='welcome'>
            <h1 className='welcome-greeting'>Welcome to Aliment!</h1>
        </div>
    </div>
  )
}

export default Home;
