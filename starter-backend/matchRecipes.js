// import { supabase } from './connection.js';

// export const fetchAllRecipes = async () => {
//   try {
//     const { data: recipes, error } = await supabase
//       .from('recipes')
//       .select('*');
//     if (error) throw error;
//     return recipes || [];
//   } catch (error) {
//     console.log('No recipes', error);
//     return [];
//   }
// };

// export const fetchFilteredRecipes = async (categories) => {
//   try {
//     const { data: recipes, error } = await supabase
//       .from('recipes')
//       .select('*')
//       .in('category', categories);
//     if (error) throw error;
//     return recipes || [];
//   } catch (error) {
//     console.log('No recipes match that category.', error);
//     return [];
//   }
// };

// export const fetchRecipesByIngredients = async (searchTerm) => {
//   try {
//     const { data: recipes, error } = await supabase
//       .from('recipes')
//       .select('*')
//       .ilike('ingredients', `%${searchTerm}%`);
//     if (error) throw error;
//     return recipes || [];
//   } catch (error) {
//     console.log('Error searching recipes:', error);
//     return [];
//   }
// };

// import { supabase } from './connection.js';

// // Fetch recipes based on categories, ingredients, and prep time
// export const fetchFilteredRecipes = async (categories, ingredients, minTime, maxTime) => {
//   try {
//     let query = supabase
//       .from('recipes')
//       .select('*, recipe_keywords(keyword_id), keywords(ingredient)');

//     // Apply category filters
//     if (categories.length > 0) {
//       query = query.in('category', categories);
//     }

//     // Apply time filters
//     query = query.gte('prep_time', minTime).lte('prep_time', maxTime);

//     const { data: recipes, error } = await query;

//     if (error) throw error;

//     // Filter by ingredients
//     if (recipes) {
//       const filteredRecipes = recipes.filter((recipe) => {
//         const recipeIngredients = recipe.keywords.map(k => k.ingredient);
//         return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
//       });
//       return filteredRecipes;
//     }

//     return [];
//   } catch (error) {
//     console.log('Error fetching filtered recipes:', error);
//     return [];
//   }
// };


// // Helper function to fetch all recipes
// export const fetchAllRecipes = async () => {
//   try {
//     const { data: recipes, error } = await supabase
//       .from('recipes')
//       .select('*');

//     if (error) throw error;
//     return recipes || [];
//   } catch (error) {
//     console.log('Error fetching all recipes:', error);
//     return [];
//   }
// };

// import { supabase } from './connection.js';

// // Fetch recipes based on categories, ingredients, and prep time
// export const fetchFilteredRecipes = async (categories = [], ingredients = [], minTime = 0, maxTime = Infinity) => {
//   try {
//     let query = supabase
//       .from('recipes')
//       .select('*, recipe_keywords(keyword_id), keywords(ingredient)');

//     // Apply category filters
//     if (Array.isArray(categories) && categories.length > 0) {
//       query = query.in('category', categories);
//     }

//     // Apply time filters
//     query = query.gte('prep_time', minTime).lte('prep_time', maxTime);

//     const { data: recipes, error } = await query;

//     if (error) throw error;

//     // Filter by ingredients
//     if (recipes) {
//       const filteredRecipes = recipes.filter(recipe => {
//         const recipeIngredients = recipe.keywords ? recipe.keywords.map(k => k.ingredient) : [];
//         return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
//       });
//       return filteredRecipes;
//     }

//     return [];
//   } catch (error) {
//     console.log('Error fetching filtered recipes:', error);
//     return [];
//   }
// };

// // Helper function to fetch all recipes
// export const fetchAllRecipes = async () => {
//   try {
//     const { data: recipes, error } = await supabase
//       .from('recipes')
//       .select('*');

//     if (error) throw error;
//     return recipes || [];
//   } catch (error) {
//     console.log('Error fetching all recipes:', error);
//     return [];
//   }
// };

import { supabase } from './connection.js';

// Fetch recipes based on categories, ingredients, and prep time
export const fetchFilteredRecipes = async (categories = [], ingredients = [], minTime = 0, maxTime = Infinity) => {
  try {
    let query = supabase
      .from('recipes')
      .select('*, recipe_keywords(keyword_id), keywords(ingredient)');

    // Apply category filters
    if (Array.isArray(categories) && categories.length > 0) {
      query = query.in('category', categories);
    }

    // Apply time filters
    query = query.gte('prep_time', minTime).lte('prep_time', maxTime);

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

// Helper function to fetch all recipes
export const fetchAllRecipes = async () => {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*');

    if (error) throw error;
    return recipes || [];
  } catch (error) {
    console.log('Error fetching all recipes:', error);
    return [];
  }
};
