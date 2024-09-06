import './App.css';
import Search from './Search';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}/hello`)
      .then(res => {
        setMessage(res.data); 
      })
      .catch(error => {
        console.error('error fetching data: ', error);
      });
  }, []); 

  console.log(message);
  return (
    <>
    <div className='container'>
      <div className='logo'>
      </div>
      <Search />
      {/* <div className='block-color1'>Added Ingredients</div>
      <div className='block-color2'></div> */}
    </div>
      {/* <h1>Hello, HCP</h1>
      <p>{message}</p> */}
    </>
  );
}

export default App;
