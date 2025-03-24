import React, { useState } from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients, url }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={style.recipe}>
      <h2 className={style.title}>{title}</h2>
      <img className={style.image} src={image} alt={title} />
      <p className={style.calories}>Calories: {Math.round(calories)} kcal</p>
      <div className={style.ingredients}>
        <ul>
          {ingredients.slice(0, showAll ? ingredients.length : 5).map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
      {ingredients.length > 5 && (
        <button className={style.toggleButton} onClick={toggleShowAll}>
          {showAll ? 'Show Less...' : 'Show More...'}
        </button>
      )}
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer" className={style.recipeLink}>
          View Full Recipe
        </a>
      </div>
    </div>
  );
};

export default Recipe;