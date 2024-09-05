import React, { useState, useEffect } from 'react';

const RecipeForm = ({ addRecipe, editRecipe, currentRecipe, onClose }) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', price: '' }]);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (currentRecipe) {
      setName(currentRecipe.name);
      const [h, m, s] = currentRecipe.time.split(/[hm\s]/).filter(Boolean);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
      setIngredients(currentRecipe.ingredients);
      setInstructions(currentRecipe.instructions);
    }
  }, [currentRecipe]);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: '', price: '' }]);
  };

  const handleSubmit = async (e) => {
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
      instructions,
    };

    if (currentRecipe) {
      await editRecipe(newRecipe);
    } else {
      await addRecipe(newRecipe);
    }

    // Clear form fields after adding/editing the recipe
    setName('');
    setHours('');
    setMinutes('');
    setSeconds('');
    setIngredients([{ name: '', price: '' }]);
    setInstructions('');

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-1 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{currentRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Recipe Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-1 border rounded"
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
            className="w-1/3 p-1 border rounded text-[14px]"
          />
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-1/3 p-1 border rounded text-[14px]"
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-1/3 p-1 border rounded text-[14px]"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2">
            <input
              type="text"
              name="name"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 p-2 border rounded text-[14px]"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={ingredient.price}
              onChange={(e) => handleIngredientChange(index, e)}
              className="flex-1 p-2 border rounded text-[14px]"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredientField}
          className="text-blue-500 mt-2 text-[14px]"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-1 border rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-1 rounded-lg text-[14px]"
      >
        {currentRecipe ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;