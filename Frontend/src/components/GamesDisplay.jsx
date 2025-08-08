
import React from 'react';
import gamesData from '../data/games.json'; 
import './GamesDisplay.css';

const GamesDisplay = () => {
  return (
    <div className="games-display-container">
      <h1 className="main-title">Explora los juegos</h1>

      <div className="filter-section">
        <div className="search-box">
          <input type="text" placeholder="Buscar" className="search-input" />
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="dropdowns">
          <select className="dropdown">
            <option>Plataforma &nbsp;&nbsp;&nbsp;&nbsp;</option>
          </select>
          <select className="dropdown">
            <option>Genero&nbsp;&nbsp;&nbsp;&nbsp;</option>
          </select>
          <select className="dropdown">
            <option>Rango de precio&nbsp;&nbsp;&nbsp;&nbsp;</option>
          </select>
        </div>
      </div>

      <div className="sort-section">
        <h2 className="sort-title">Ordenado por</h2>
        <div className="sort-buttons">
          <button className="sort-button active">Precio</button>
          <button className="sort-button">Fecha de Lanzamiento</button>
          <button className="sort-button">Popularidad</button>
        </div>
      </div>

      <div className="games-grid">
        {gamesData.map((game, index) => (
          <div key={index} className="game-card">
            <img src={game.image} alt={game.title} className="game-image" />
            <h3 className="game-title">{game.title}</h3>
            <p className="game-platforms">{game.platforms}</p>
            <p className="game-price">{game.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesDisplay;