import React, { useState } from 'react';
import RecipeForm from './components/RecipeForm';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div className="container mx-auto p-4">
      <RecipeForm addRecipe={addRecipe} />
    </div>
  );
};

export default App;
