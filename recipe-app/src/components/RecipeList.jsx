import React, { useState } from 'react';

const RecipeList = ({ recipes }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Recipe List</h2>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index} className="p-4 mb-4 border rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{recipe.name}</h3>
                <p className="text-sm text-gray-500">Time to Cook: {recipe.time}</p>
                <p className="text-sm text-gray-500">Total Cost: ${recipe.totalCost.toFixed(2)}</p>
              </div>
              <button
                onClick={() => toggleExpand(index)}
                className="text-blue-500"
              >
                {expandedIndex === index ? 'X' : '▼'}
              </button>
            </div>
            {expandedIndex === index && (
              <div className="mt-4">
                <h4 className="font-semibold">Ingredients:</h4>
                <ul className="list-disc ml-5">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient.name} - ${ingredient.price}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mt-4">Instructions:</h4>
                <p>{recipe.instructions}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No recipes added yet.</p>
      )}
    </div>
  );
};

export default RecipeList;
