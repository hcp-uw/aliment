// // const express = require("express")
// // const cors = require("cors")
// // const { unknownEndpoint } = require('./middleware');
// import express from "express";
// import cors from "cors";
// import { fetchAllRecipes, fetchFilteredRecipes, fetchRecipesByIngredients } from './matchRecipes.js';
// import { unknownEndpoint } from './middleware.js';

// // create your express application
// const app = express();

// // enable cors
// app.use(cors());

// // [added] allowing the server to parse JSON requests
// app.use(express.json());

// // test endpoint
// app.get('/hello', (req, res) => { 
//   res.send('Attention HCP Project Team! If you see this, your front end and back end are connected.') 
// });

// // [added] API route to get all the recipes
// app.get('/recipes', async (req, res) => {
//   const recipes = await fetchAllRecipes();
//   res.json(recipes);
// });

// // [added] API to filter the recipes
// app.post('/filter', async (req, res) => {
//   const { categories } = req.body;
//   const filteredRecipes = await fetchFilteredRecipes(categories);
//   res.json(filteredRecipes);
// });

// // [added] API to search recipes by ingredients
// app.post('/search', async (req, res) => {
//   const { searchTerm } = req.body;

//   try {
//     const recipes = await fetchRecipesByIngredients(searchTerm);
//     res.json(recipes);
//   } catch (error) {
//     console.error('Error searching recipes:', error);
//     res.status(500).json([]);
//   }
// });

// // error handling
// app.use(unknownEndpoint);

// // set port to listen on
// const PORT = 3001;

// // start your server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import { fetchAllRecipes, fetchFilteredRecipes } from './matchRecipes.js';
import { unknownEndpoint } from './middleware.js';

// Create your express application
const app = express();

// Enable CORS
app.use(cors());

// Allow the server to parse JSON requests
app.use(express.json());

// Test endpoint
app.get('/hello', (req, res) => { 
  res.send('Attention HCP Project Team! If you see this, your front end and back end are connected.'); 
});

// API route to get all the recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await fetchAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
});

// API to filter the recipes
app.post('/filter', async (req, res) => {
  const { categories = [], ingredients = [], minTime = 0, maxTime = Infinity } = req.body;

  try {
    const filteredRecipes = await fetchFilteredRecipes(categories, ingredients, minTime, maxTime);
    res.json(filteredRecipes);
  } catch (error) {
    console.error('Error filtering recipes:', error);
    res.status(500).json({ error: 'Failed to filter recipes.' });
  }
});


// Error handling for unknown endpoints
app.use(unknownEndpoint);

// Set port to listen on
const PORT = 3001;

// Start your server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
