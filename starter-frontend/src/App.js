// import './App.css';
// // import Search from './Search';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { fetchAllRecipes,  fetchFilteredRecipes } from './matchRecipes';
// import logo from './aliment.webp';

// const baseURL = 'http://localhost:3001';

// function App() {
//   const [message, setMessage] = useState('');
//   const [data, setData] = useState([]);
//   const [veg, setVeg] = useState(false);
//   const [sea, setSea] = useState(false);
//   const [sal, setSal] = useState(false);
//   const [pas, setPas] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedIngredients, setSelectedIngredients] = useState([]);

//   useEffect(() => {
//     axios.get(`${baseURL}/hello`)
//       .then(res => {
//         setMessage(res.data); 
//       })
//       .catch(error => {
//         console.error('error fetching data: ', error);
//       });
//   }, []); 

//   console.log(message);

//   const handleGenerateRecipes = async () => {
//     let categories = [];
//     if (veg) categories.push('Vegetarian');
//     if (sea) categories.push('Seafood');
//     if (sal) categories.push('Salad');
//     if (pas) categories.push('Pasta');

//     try {
//       let recipes;
//       if (selectedIngredients.length > 0) {
//         recipes = await fetchFilteredRecipes(categories, selectedIngredients);
//       } else if (categories.length === 0) {
//         recipes = await fetchAllRecipes();
//       } else {
//         recipes = await fetchFilteredRecipes(categories);
//       }

//       if (Array.isArray(recipes)) {
//         setData(recipes);
//       } else {
//         console.error("Expected an array but got:", recipes);
//         setData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//       setData([]);
//     }
//   };

//   const [query, setQuery] = useState([]);
//   const [ingredient, setIngredient] = useState("");

//   function handleAddIngredient() {
//     const newArray = query;
//     if (ingredient !== "" && !newArray.includes(ingredient)) {
//       newArray.push(ingredient);
//     }
//     setQuery(newArray);
//     setIngredient("");
//     console.log(query);
//   }

//   function handleRemoveIngredient() {
//     const newArray = [];
//     setQuery(newArray);
//     setIngredient("");
//     console.log(query);
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div className="header-section">
//           <img src={logo} alt="aliment logo" className="logo" />
//           <p className="title">Welcome to Aliment! Generate some recipes!</p>
//           <input
//             type="text"
//             placeholder="Search by ingredients..."
//             value={searchTerm}
//             className="search-bar"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={handleAddIngredient} className="buttons"> Add Ingredient</button>
//           <button onClick={handleRemoveIngredient} className="buttons">Clear</button>
//         </div>

//         <div className="main-container">
//           {/* Filter Section */}
//           <div className="filter-section">
//             <h2>Filters</h2>
//             <hr></hr>
//             <div className="check">
//               <label>
//                 <input type="checkbox" checked={veg} onChange={() => setVeg(!veg)} />
//                 Vegetarian
//               </label>
//               <label>
//                 <input type="checkbox" checked={sea} onChange={() => setSea(!sea)} />
//                 Seafood
//               </label>
//               <label>
//                 <input type="checkbox" checked={sal} onChange={() => setSal(!sal)} />
//                 Salad
//               </label>
//               <label>
//                 <input type="checkbox" checked={pas} onChange={() => setPas(!pas)} />
//                 Pasta
//               </label>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="content-section">
//             {/* Generate Button */}
//             <button className="button" onClick={handleGenerateRecipes}>Generate Recipes</button>

//             {/* Display recipes */}
//             <div className="recipe-list">
//               {data.length > 0 ? (
//                 data.map((recipe, index) => (
//                   <div key={index} className="recipe-card">
//                     {/* <img src={recipe.image} alt={recipe.name} className="recipe-image" /> */}
//                     <div className="recipe-info">
//                       <h3>{recipe.name}</h3>
//                       <p>{recipe.category}</p>
//                       <p>Prep Time: {recipe.prep_time}</p>
//                       <a href={recipe.Link}>  <button>Link</button> </a>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No recipes found</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';
// import { fetchAllRecipes, fetchFilteredRecipes } from './matchRecipes';
// import logo from './aliment.webp';

// const baseURL = 'http://localhost:3001';

// function App() {
//   const [message, setMessage] = useState('');
//   const [data, setData] = useState([]);
//   const [veg, setVeg] = useState(false);
//   const [sea, setSea] = useState(false);
//   const [sal, setSal] = useState(false);
//   const [pas, setPas] = useState(false);
//   const [minTime, setMinTime] = useState(''); // Start with empty string
//   const [maxTime, setMaxTime] = useState(''); // Start with empty string
//   const [ingredient, setIngredient] = useState('');
//   const [query, setQuery] = useState([]);
//   const [buttonPressed, setButtonPressed] = useState(false);

//   useEffect(() => {
//     axios.get(`${baseURL}/hello`)
//       .then(res => {
//         setMessage(res.data);
//       })
//       .catch(error => {
//         console.error('Error fetching message:', error);
//       });
//   }, []);

//   const handleGenerateRecipes = async () => {
//     let categories = [];
//     if (veg) categories.push('Vegetarian');
//     if (sea) categories.push('Seafood');
//     if (sal) categories.push('Salad');
//     if (pas) categories.push('Pasta');
  
//     const min = minTime !== '' ? Number(minTime) : 0;
//     const max = maxTime !== '' ? Number(maxTime) : Infinity;
  
//     try {
//       let recipes;
  
//       if (categories.length === 0 && query.length === 0) {
//         recipes = await fetchAllRecipes();
//       } else {
//         recipes = await fetchFilteredRecipes(categories, query, min, max);
//       }
  
//       setData(recipes || []);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       setData([]);
//     }
  
//     setButtonPressed(true);
//   };
  

//   const handleAddIngredient = () => {
//     if (ingredient !== '' && !query.includes(ingredient)) {
//       setQuery([...query, ingredient]); // Spread the existing query and add the new ingredient
//     }
//     setIngredient('');
//   };

//   const handleRemoveIngredient = () => {
//     setQuery([]); // Clear the selected ingredients
//     setIngredient('');
//   };

//   const renderIngredients = () => {
//     return query.map((item, index) => (
//       <li key={index} className="ingredient-item">
//         {item}
//       </li>
//     ));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div className="header-section">
//           <img src={logo} alt="aliment logo" className="logo" />
//           <p className="title">Welcome to Aliment! Generate some recipes!</p>
//         </div>

//         <div className="main-container">
//           <div className="filter-section">
//             <h2>Filters</h2>
//             <hr />
//             <div className="check">
//               <label>
//                 <input type="checkbox" checked={veg} onChange={() => setVeg(!veg)} />
//                 Vegetarian
//               </label>
//               <label>
//                 <input type="checkbox" checked={sea} onChange={() => setSea(!sea)} />
//                 Seafood
//               </label>
//               <label>
//                 <input type="checkbox" checked={sal} onChange={() => setSal(!sal)} />
//                 Salad
//               </label>
//               <label>
//                 <input type="checkbox" checked={pas} onChange={() => setPas(!pas)} />
//                 Pasta
//               </label>
//             </div>

//             <h2>Prep-Time</h2>
//             <hr />
//             <div>
//               <input
//                 type="number"
//                 placeholder="Min-Time"
//                 value={minTime}
//                 onChange={e => setMinTime(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Max-Time"
//                 value={maxTime}
//                 onChange={e => setMaxTime(e.target.value)}
//               />
//             </div>

//             {/* Filter Button */}
//             <button onClick={handleGenerateRecipes} className="button">Filter</button>
//           </div>

//           <div className="content-section">
//             <div className="search-bar">
//               <label className="ingredient-title">Search by ingredient:</label>
//               <input type="text" value={ingredient} onChange={e => setIngredient(e.target.value)} />
//               <button onClick={handleAddIngredient} className="add_ingredient">Add Ingredient</button>
//               <button onClick={handleRemoveIngredient} className="add_ingredient">Clear</button>
//             </div>
//             <div className="Ingredients">
//               <ul className="ingredient-list">
//                 {renderIngredients()}
//               </ul>
//             </div>

//             <button onClick={handleGenerateRecipes} className="button">Generate Recipes</button>

//             <div className="recipe-list">
//               {buttonPressed ? (
//                 data.length > 0 ? (
//                   data.map((recipe, index) => (
//                     <div key={index} className="recipe-card">
//                       <div className="recipe-info">
//                         <h3>{recipe.name}</h3>
//                         <p>{recipe.category}</p>
//                         <p>Prep Time: {recipe.prep_time}</p>
//                         <a href={recipe.Link}> <button>Link</button> </a>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No recipes found</p>
//                 )
//               ) : (
//                 <p>Please select categories and ingredients to generate recipes.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { fetchAllRecipes, fetchFilteredRecipes } from './matchRecipes';
import logo from './aliment.webp';

const baseURL = 'http://localhost:3001';

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [veg, setVeg] = useState(false);
  const [sea, setSea] = useState(false);
  const [sal, setSal] = useState(false);
  const [pas, setPas] = useState(false);
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [query, setQuery] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    axios.get(`${baseURL}/hello`)
      .then(res => {
        setMessage(res.data);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
      });
  }, []);

  const handleGenerateRecipes = async () => {
    let categories = [];
    if (veg) categories.push('Vegetarian');
    if (sea) categories.push('Seafood');
    if (sal) categories.push('Salad');
    if (pas) categories.push('Pasta');
  
    const min = minTime !== '' ? Number(minTime) : 0; // Ensure min is a number
    const max = maxTime !== '' ? Number(maxTime) : Infinity; // Ensure max is a number
  
    try {
      let recipes;
  
      if (categories.length === 0 && query.length === 0) {
        recipes = await fetchAllRecipes();
      } else {
        recipes = await fetchFilteredRecipes(categories, query, min, max);
      }
  
      setData(recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setData([]);
    }
  
    setButtonPressed(true);
  };
  

  const handleAddIngredient = () => {
    if (ingredient !== '' && !query.includes(ingredient)) {
      setQuery([...query, ingredient]);
    }
    setIngredient('');
  };

  const handleRemoveIngredient = () => {
    setQuery([]);
    setIngredient('');
  };

  const renderIngredients = () => {
    return query.map((item, index) => (
      <li key={index} className="ingredient-item">
        {item}
      </li>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-section">
          <img src={logo} alt="aliment logo" className="logo" />
          <p className="title">Welcome to Aliment! Generate some recipes!</p>
        </div>

        <div className="main-container">
          <div className="filter-section">
            <h2>Filters</h2>
            <hr />
            <div className="check">
              <label>
                <input type="checkbox" checked={veg} onChange={() => setVeg(!veg)} />
                Vegetarian
              </label>
              <label>
                <input type="checkbox" checked={sea} onChange={() => setSea(!sea)} />
                Seafood
              </label>
              <label>
                <input type="checkbox" checked={sal} onChange={() => setSal(!sal)} />
                Salad
              </label>
              <label>
                <input type="checkbox" checked={pas} onChange={() => setPas(!pas)} />
                Pasta
              </label>
            </div>

            <h2>Prep-Time</h2>
            <hr />
            <div>
              <input
                type="number"
                placeholder="Min-Time"
                value={minTime}
                onChange={e => setMinTime(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max-Time"
                value={maxTime}
                onChange={e => setMaxTime(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <button onClick={handleGenerateRecipes} className="button">Generate Recipes</button>
          </div>

          <div className="content-section">
            <div className="search-bar">
              <label className="ingredient-title">Search by ingredient:</label>
              <input type="text" value={ingredient} onChange={e => setIngredient(e.target.value)} />
              <button onClick={handleAddIngredient} className="add_ingredient">Add Ingredient</button>
              <button onClick={handleRemoveIngredient} className="add_ingredient">Clear</button>
            </div>
            <div className="Ingredients">
              <ul className="ingredient-list">
                {renderIngredients()}
              </ul>
            </div>

            <div className="recipe-list">
              {buttonPressed ? (
                data.length > 0 ? (
                  data.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                      <div className="recipe-info">
                        <h3>{recipe.name}</h3>
                        <p>{recipe.category}</p>
                        <p>Prep Time: {recipe.prep_time}</p>
                        <a href={recipe.Link}><button>Link</button></a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recipes found</p>
                )
              ) : (
                <p>Please select categories and ingredients to generate recipes.</p>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
