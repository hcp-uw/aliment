// frontend
export const fetchAllRecipes = async () => {
  try {
    const response = await fetch('http://localhost:3001/recipes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
};

export const fetchFilteredRecipes = async (categories) => {
  try {
    const response = await fetch('http://localhost:3001/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ categories })  // Send the selected categories
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered recipes:", error);
    return [];
  }
};

export const searchIngredients = async (searchTerm) => {
  try {
    const response = await fetch(`http://localhost:3001/ingredients?search=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};