import React, { useState, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  // Load recipes from local storage when the component mounts
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  // Save recipes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = async (recipe) => {
    setRecipes([...recipes, recipe]);

    // Encode the username and password in base64 for Basic Authentication
    const username = 'admin';
    const password = 'CxVb 2pG4 FtUR ihJt R0TX cMMG';
    const credentials = btoa(`${username}:${password}`);
    
    try {
      const response = await fetch('http://laa-woo2.local/wp-json/wp/v2/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`, // Set the Basic Authentication header
        },
        body: JSON.stringify({
          title: recipe.name,
          content: `Time: ${recipe.time} | Total Cost: $${recipe.totalCost}\n\nIngredients: ${recipe.ingredients.map(ing => `${ing.name} - $${ing.price}`).join(', ')}\n\nInstructions: ${recipe.instructions}`,
          status: 'publish', // or 'draft' depending on your needs
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe to WordPress');
      }

      console.log('Recipe saved to WordPress!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <RecipeForm addRecipe={addRecipe} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;
