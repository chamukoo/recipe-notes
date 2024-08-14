import React, { useState } from 'react';

const RecipeForm = ({ addRecipe }) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', price: '' }]);
  const [instructions, setInstructions] = useState('');

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: '', price: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalCost = ingredients.reduce((total, item) => {
      return total + parseFloat(item.price || 0);
    }, 0);

    const totalTime = `${hours || 0}h ${minutes || 0}m ${seconds || 0}s`;

    const newRecipe = {
      name,
      time: totalTime,
      ingredients,
      totalCost,
      instructions
    };

    addRecipe(newRecipe);

    setName('');
    setHours('');
    setMinutes('');
    setSeconds('');
    setIngredients([{ name: '', price: '' }]);
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Recipe Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Time to Cook</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-1/3 p-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name="name"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={ingredient.price}
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredientField}
          className="text-blue-500 mt-2"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
