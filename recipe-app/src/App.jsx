import React, { useState, useEffect } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = async (recipe) => {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);

    const username = 'admin';
    const password = 'CxVb 2pG4 FtUR ihJt R0TX cMMG';
    const credentials = btoa(`${username}:${password}`);
    
    try {
      const response = await fetch('http://laa-woo2.local/wp-json/wp/v2/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify({
          title: recipe.name,
          content: `Time: ${recipe.time} | Total Cost: $${recipe.totalCost}\n\nIngredients: ${recipe.ingredients.map(ing => `${ing.name} - $${ing.price}`).join(', ')}\n\nInstructions: ${recipe.instructions}`,
          status: 'publish',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe to WordPress');
      }

      const result = await response.json();
      const updatedRecipe = { ...recipe, postId: result.id };
      setRecipes([...newRecipes.slice(0, -1), updatedRecipe]);

      console.log('Recipe saved to WordPress!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const editRecipe = async (updatedRecipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.postId === editingRecipe.postId ? { ...updatedRecipe, postId: editingRecipe.postId } : r
    );
    setRecipes(updatedRecipes);
    setEditingRecipe(null);
  
    const username = 'admin';
    const password = 'CxVb 2pG4 FtUR ihJt R0TX cMMG';
    const credentials = btoa(`${username}:${password}`);
  
    try {
      const response = await fetch(`http://laa-woo2.local/wp-json/wp/v2/posts/${editingRecipe.postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
        },
        body: JSON.stringify({
          title: updatedRecipe.name,
          content: `Time: ${updatedRecipe.time} | Total Cost: $${updatedRecipe.totalCost}\n\nIngredients: ${updatedRecipe.ingredients.map(ing => `${ing.name} - $${ing.price}`).join(', ')}\n\nInstructions: ${updatedRecipe.instructions}`,
          status: 'publish',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update recipe on WordPress');
      }
  
      console.log('Recipe updated on WordPress!');
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const deleteRecipe = async (recipe) => {
    const updatedRecipes = recipes.filter((r) => r.postId !== recipe.postId);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  
    const username = 'admin';
    const password = 'CxVb 2pG4 FtUR ihJt R0TX cMMG';
    const credentials = btoa(`${username}:${password}`);
  
    try {
      const response = await fetch(`http://laa-woo2.local/wp-json/wp/v2/posts/${recipe.postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Recipe deleted from WordPress!');
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete recipe from WordPress. Status: ${response.status}, Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <div className="container mx-auto p-4 flex justify-center space-x-4">
      <div className="w-1/2">
        {editingRecipe ? (
          <RecipeForm
            currentRecipe={editingRecipe}
            editRecipe={editRecipe}
            onClose={() => setEditingRecipe(null)}
          />
        ) : (
          <RecipeForm addRecipe={addRecipe} />
        )}
      </div>
      <div className="w-1/2">
        <RecipeList
          recipes={recipes}
          onEdit={(recipe) => setEditingRecipe(recipe)}
          onDelete={deleteRecipe}
        />
      </div>
    </div>
  );
};

export default App;
