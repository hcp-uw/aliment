import './App.css';
// import Search from './Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllRecipes,  fetchFilteredRecipes, searchIngredients } from './matchRecipes';
import logo from './aliment.webp';

const baseURL = 'http://localhost:3001';

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [veg, setVeg] = useState(false);
  const [sea, setSea] = useState(false);
  const [sal, setSal] = useState(false);
  const [pas, setPas] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm) {
        try {
          const ingredients = await searchIngredients(searchTerm);
          setSuggestions(ingredients);
        } catch (error) {
          console.error('Error fetching ingredient suggestions: ', error);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchTerm]);


  const handleGenerateRecipes = async () => {
    let categories = [];
    if (veg) categories.push('Vegetarian');
    if (sea) categories.push('Seafood');
    if (sal) categories.push('Salad');
    if (pas) categories.push('Pasta');

    try {
      let recipes;
      if (selectedIngredients.length > 0) {
        recipes = await fetchFilteredRecipes(categories, selectedIngredients);
      } else if (categories.length === 0) {
        recipes = await fetchAllRecipes();
      } else {
        recipes = await fetchFilteredRecipes(categories);
      }

      if (Array.isArray(recipes)) {
        setData(recipes);
      } else {
        console.error("Expected an array but got:", recipes);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setData([]);
    }
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleIngredientRemove = (ingredient) => {
    setSelectedIngredients((prev) => prev.filter(i => i !== ingredient));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-section">
          <img src={logo} alt="aliment logo" className="logo" />
          <input
            type="text"
            placeholder="Search by ingredients..."
            value={searchTerm}
            className="search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="main-container">
          {/* Filter Section */}
          <div className="filter-section">
            <h2>Filters</h2>
            <hr></hr>
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
          </div>

          {/* Content Section */}
          <div className="content-section">
            {/* Selected Ingredients */}
            <div className="selected-ingredients">
              {selectedIngredients.map((ingredient, index) => (
                <span key={index} className="selected-ingredient">
                  {ingredient}
                  <button onClick={() => handleIngredientRemove(ingredient)}>x</button>
                </span>
              ))}
            </div>

            {/* Generate Button */}
            <button className="button" onClick={handleGenerateRecipes}>Generate Recipes</button>

            {/* Display recipes */}
            <div className="recipe-list">
              {data.length > 0 ? (
                data.map((recipe, index) => (
                  <div key={index} className="recipe-card">
                    {/* <img src={recipe.image} alt={recipe.name} className="recipe-image" /> */}
                    <div className="recipe-info">
                      <h3>{recipe.name}</h3>
                      <p>{recipe.category}</p>
                      <p>Prep Time: {recipe.prep_time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recipes found</p>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;