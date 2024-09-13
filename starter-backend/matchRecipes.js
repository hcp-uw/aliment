import { supabase } from './connection.js';

export const fetchAllRecipes = async () => {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*');
    if (error) throw error;
    return recipes || [];
  } catch (error) {
    console.log('No recipes', error);
    return [];
  }
};

export const fetchFilteredRecipes = async (categories) => {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .in('category', categories);
    if (error) throw error;
    return recipes || [];
  } catch (error) {
    console.log('No recipes match that category.', error);
    return [];
  }
};

export const fetchRecipesByIngredients = async (searchTerm) => {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .ilike('ingredients', `%${searchTerm}%`);
    if (error) throw error;
    return recipes || [];
  } catch (error) {
    console.log('Error searching recipes:', error);
    return [];
  }
};
