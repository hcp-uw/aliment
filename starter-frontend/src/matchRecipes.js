// // frontend
// export const fetchAllRecipes = async () => {
//   try {
//     const response = await fetch('http://localhost:3001/recipes');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching all recipes:", error);
//     return [];
//   }
// };

// export const fetchFilteredRecipes = async (categories, ingredients, minTime, maxTime) => {
//   try {
//     const response = await fetch('http://localhost:3001/filter', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         categories,    // Send the selected categories
//         ingredients,   // Send the selected ingredients
//         minTime,       // Send the minimum prep time
//         maxTime,       // Send the maximum prep time
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching filtered recipes:', error);
//     return [];
//   }
// };


// export const searchIngredients = async (searchTerm) => {
//   try {
//     const response = await fetch(`http://localhost:3001/ingredients?search=${searchTerm}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching ingredients:", error);
//     return [];
//   }
// };

// // Frontend

// // Base URL for API requests
// const BASE_URL = 'http://localhost:3001';

// // Fetch all recipes
// export const fetchAllRecipes = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/recipes`);
//     if (!response.ok) {
//       const errorDetails = await response.text(); // Get detailed error response
//       throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching all recipes:", error);
//     return [];
//   }
// };

// // Fetch filtered recipes
// export const fetchFilteredRecipes = async (categories, ingredients, minTime, maxTime) => {
//   try {
//     const response = await fetch(`${BASE_URL}/filter`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         categories,    // Send the selected categories
//         ingredients,   // Send the selected ingredients
//         minTime,       // Send the minimum prep time
//         maxTime,       // Send the maximum prep time
//       }),
//     });

//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching filtered recipes:', error);
//     return [];
//   }
// };

// // Search ingredients
// export const searchIngredients = async (searchTerm) => {
//   try {
//     const response = await fetch(`${BASE_URL}/ingredients?search=${encodeURIComponent(searchTerm)}`);
//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching ingredients:", error);
//     return [];
//   }
// };

// Frontend

// Base URL for API requests
const BASE_URL = 'http://localhost:3001';

// Fetch all recipes
export const fetchAllRecipes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/recipes`);
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
};

// Fetch filtered recipes
export const fetchFilteredRecipes = async (categories = [], ingredients = [], minTime = 0, maxTime = Infinity) => {
  try {
    let query = supabase
      .from('recipes')
      .select('*, recipe_keywords(keyword_id), keywords(ingredient)');

    // Apply category filters
    if (categories.length > 0) {
      query = query.in('category', categories);
    }

    // Apply time filters, making sure to handle invalid or null values
    if (minTime !== null && !isNaN(minTime)) {
      query = query.gte('prep_time', Number(minTime));
    }
    if (maxTime !== null && !isNaN(maxTime)) {
      query = query.lte('prep_time', Number(maxTime));
    }

    const { data: recipes, error } = await query;

    if (error) throw error;

    // Filter by ingredients
    if (recipes) {
      const filteredRecipes = recipes.filter(recipe => {
        const recipeIngredients = recipe.keywords ? recipe.keywords.map(k => k.ingredient) : [];
        return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
      });
      return filteredRecipes;
    }

    return [];
  } catch (error) {
    console.log('Error fetching filtered recipes:', error);
    return [];
  }
};


// Search ingredients
export const searchIngredients = async (searchTerm) => {
  try {
    const response = await fetch(`${BASE_URL}/ingredients?search=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};
