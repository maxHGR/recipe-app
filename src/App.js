import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './style.css';

const App = () => {
  const APP_ID = '278f2db2';
  const APP_KEY = '3142404a19f516152866e824d299b5e0';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('vegetables');
  const [isSearchActive, setIsSearchActive] = useState(false); // State to toggle search bar

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=15&calories=591-722&health=alcohol-free`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive); // Toggle the search bar
  };

  return (
    <div className="App">
      <header className={`header ${isSearchActive ? 'search-active' : ''}`}>
        <h1 className="header-title">Recipe Finder</h1>
        <div className='search-container'>
          <form
            onSubmit={getSearch}
            className={`search-form ${isSearchActive ? 'active' : ''}`}
          >
            <input
              className="search-bar"
              type="text"
              value={search}
              onChange={updateSearch}
              placeholder="Search by recipe, ingredients, diet, cuisine, ..."
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <div className="search-icon" onClick={toggleSearch}>
            🔍
          </div>
        </div>
      </header>

      <div className="recipes">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          url={recipe.recipe.url}
        />
      ))}
      </div>

      <footer className="footer">
        Recipe Finder  🔍
      </footer>
    </div>
  );
};

export default App;

/*
<header className="header">
  <h1 className="header-title">Recipe Finder</h1>
</header>
<form onSubmit={getSearch} className="search-form">
  <input
    className="search-bar"
    type="text"
    value={search}
    onChange={updateSearch}
  />
  <button className="search-button" type="submit">
    Search
  </button>
</form>
*/