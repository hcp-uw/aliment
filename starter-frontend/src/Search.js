import React, { useState } from "react";

function Search() {
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Define allowed ingredients
  const allowedIngredients = [
    'Allspice', 'Almond Milk', 'Anchovies', 'Apple Cider Vinegar', 'Arborio Rice',
    'Baking Powder', 'Baking Soda', 'Balsamic Vinegar', 'Barley', 'Basil',
    'Bay Leaves', 'Black Beans', 'Black Pepper', 'Blue Cheese', 'Bread Flour',
    'Brown Rice', 'Brown Sugar', 'Butter', 'Buttermilk', 'Canned Tomatoes',
    'Canola Oil', 'Capers', 'Cardamom', 'Carrots', 'Cashews',
    'Cayenne Pepper', 'Celery Seed', 'Cheddar Cheese', 'Cherry Tomatoes', 'Chicken Breast',
    'Chicken Stock', 'Chickpeas', 'Chili Powder', 'Chives', 'Chocolate Chips',
    'Cilantro', 'Cinnamon', 'Cloves', 'Cocoa Powder', 'Coconut',
    'Coconut Milk', 'Coconut Oil', 'Cornmeal', 'Cornstarch', 'Cream Cheese',
    'Cumin', 'Curry Powder', 'Dijon Mustard', 'Dill', 'Dry Mustard',
    'Dry White Wine', 'Eggs', 'Fennel Seeds', 'Feta Cheese', 'Fish Sauce',
    'Flour', 'Garlic', 'Garlic Powder', 'Ginger', 'Granulated Sugar',
    'Green Beans', 'Green Onions', 'Ground Beef', 'Ground Chicken', 'Ground Pork',
    'Heavy Cream', 'Honey', 'Horseradish', 'Hot Sauce', 'Jalapeno Peppers',
    'Kale', 'Ketchup', 'Kidney Beans', 'Kosher Salt', 'Lemon Juice',
    'Lentils', 'Lime Juice', 'Maple Syrup', 'Marinara Sauce', 'Mayonnaise',
    'Milk', 'Molasses', 'Mozzarella Cheese', 'Mushrooms', 'Mustard Seeds',
    'Nutmeg', 'Oats', 'Olive Oil', 'Onions', 'Oregano',
    'Panko Breadcrumbs', 'Paprika', 'Parmesan Cheese', 'Parsley', 'Pasta',
    'Peanut Butter', 'Peanuts', 'Pecans', 'Pickles', 'Pine Nuts',
    'Pinto Beans', 'Quinoa', 'Raisins', 'Red Pepper Flakes', 'Rice Vinegar',
    'Rosemary', 'Saffron', 'Salmon Fillets', 'Sesame Oil', 'Sesame Seeds',
    'Shallots', 'Sour Cream', 'Soy Sauce', 'Spinach', 'Sun-Dried Tomatoes', 'Sugar', 'Salt'
  ];
  
  const generator = () => {
    // adding the generated recipe
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setIngredient(value);
    
    // Filter for suggestions that include the typed text
    if (value.length > 0) {
      const filteredSuggestions = allowedIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddIngredient = (ingredientToAdd = ingredient) => {
    if(ingredientToAdd.trim() !== '' && allowedIngredients.includes(ingredientToAdd.trim())) {
      setIngredientList([...ingredientList, ingredientToAdd.trim()]);
      setIngredient('');
      setSuggestions([]);
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredientList];
    updatedIngredients.splice(index, 1);
    setIngredientList(updatedIngredients);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleAddIngredient(suggestion);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter an ingredient"
          value={ingredient}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="autocomplete-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <div className='block-color1'>Added Ingredients</div>
      <div className="ingredient-list">
        {ingredientList.map((item, index) => (
          <div
            key={index}
            className="ingredient-item"
            onClick={() => handleRemoveIngredient(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="generator-button" onClick={generator}>Generate recipes!</button>
    </div>
  );
}

export default Search;

