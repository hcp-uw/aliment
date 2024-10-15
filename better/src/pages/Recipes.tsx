import React, { useState, useEffect } from 'react';
import './Recipes.css';
import { allRecipes, filterHelper } from '../matchRecipes';
import logo from '../aliment logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';

export function Home() {
  const [data, setData] = useState<any[]>([]);
  const [veg, setVeg] = useState<boolean>(false);
  const [sea, setSea] = useState<boolean>(false);
  const [sal, setSal] = useState<boolean>(false);
  const [pas, setPas] = useState<boolean>(false);

  useEffect(() => {
    // fetchData();
  }, []);

  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(1000);
  function handleMinTime(input: string) {
    setMinTime(parseInt(input));
  }
  function handleMaxTime(input: string) {
    setMaxTime(parseInt(input));
  }

  async function fetchData(query: string[]) {
    let array: string[] = [];
    if (veg) array.push('Vegetarian');
    if (sea) array.push('Seafood');
    if (sal) array.push('Salad');
    if (pas) array.push('Pasta');


    try {
      const fetchedData = array.length === 0 && query.length === 0 ?
        await allRecipes(minTime, maxTime) : await filterHelper(array, query, minTime, maxTime);
      if (Array.isArray(fetchedData)) {
        setData(fetchedData);
      } else {
        console.error('Unexpected data format:', fetchedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const [buttonPressed, setButtonPressed] = useState(false);

  const [query, setQuery] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState("");

  function handleGenerateRecipes() {
    setButtonPressed(true);
    fetchData(query);
  }

  function handleAddIngredient() {
    const newArray: string[] = query;
    if (ingredient !== "" && !newArray.includes(ingredient)) {
      newArray.push(ingredient);
    }
    setQuery(newArray);
    setIngredient("");
    console.log(query);
  }

  function renderIngredients(): JSX.Element[] {
    const ingredient_list: JSX.Element[] = [];
    for (const item of query) {
      ingredient_list.push(
            <li key={item} className="ingredient-item">
              <text>{item}</text>
            </li>
        )
    }
    return ingredient_list;
  }

  function handleRemoveIngredient() {
    const newArray: string[] = [];
    setQuery(newArray);
    setIngredient("");
    console.log(query);
  }

  const navigate = useNavigate();

  function handleRecipeClick(link: string) {
    window.location.href = link;
  }

  return (
    <div className="App">
        <Navbar/>
      <header className="App-header">
        <div className='header-section'>
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </header>


      <div className='main-container'>
        <div className='category-section'>
          <h1>Filter</h1>
          <hr></hr>
          <h2>Categories</h2>
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
          
          <hr></hr>
          <h2>Prep-Time</h2>
          <div>
            {/* fix this! need to make sure only ints can be inputted */}
            <input type='text' placeholder='Min-Time' onChange={e => handleMinTime(e.target.value)}></input>
            <input type='text' placeholder='Max-Time'onChange={e => handleMaxTime(e.target.value)}></input>
          </div>
          <hr></hr>

          <h2>Total-Time</h2>
          <div>
            {/* fix this! need to make sure only ints can be inputted */}
            <input type='text' placeholder='Min-Time' onChange={e => handleMinTime(e.target.value)}></input>
            <input type='text' placeholder='Max-Time'onChange={e => handleMaxTime(e.target.value)}></input>
          </div>
        </div>

        <div className='content-section'>
          <div className='search-bar'>
            <label className='ingredient-title'>Search by ingredient: </label>
            <input type="text" value={ingredient} onChange = {e => setIngredient(e.target.value)} />
            <button onClick={handleAddIngredient} className='add_ingredient'>Add Ingredient</button>
            <button onClick={handleRemoveIngredient} className='add_ingredient'>Clear</button>
          </div>
          <div className='Ingredients'>
            <ul className='ingredient-list'>
              {renderIngredients()}
            </ul>
          </div>
          
          <button onClick={handleGenerateRecipes} className='button'>Generate Recipes</button>

          <div className="recipe-list">
            {buttonPressed ? (data.map((recipe, index) => (
              <div key={index} className="recipe-card">
                {/* <img src={recipe.image} alt={recipe.name} className="recipe-image" /> */}
                <div className="recipe-info">
                  <h3>{recipe.name}</h3>
                    <p>{recipe.category}</p>
                    <p>Prep Time: {recipe.prep_time}</p>
                    <p>Total Time: {recipe.total_time}</p>
                    <button className="recipe-button" onClick={() => handleRecipeClick(recipe.Link)}>Link</button>
                </div>
              </div>
            ))
            ) 
            : (
              <p ></p>
                )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
