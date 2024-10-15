import React, { useState, useEffect } from 'react';
import { allRecipes, filterHelper } from './matchRecipes';
import logo from './aliment logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Recipes from "./pages/Recipes";
import { Home } from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className='full-app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>

  );

}

export default App;
