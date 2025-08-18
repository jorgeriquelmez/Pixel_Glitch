import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext'; // Importa el contexto
import { useNavigate } from "react-router-dom";
import './CardGame.css';

const CardGame = ({ game }) => {
  const { addToCart } = useContext(AppContext); // Usa el contexto para obtener la función
  const [selectedPlatform, setSelectedPlatform] = useState(game.platforms.split(', ')[0] || '');
  const navigate = useNavigate();

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleAddToCart = () => {
    addToCart(game, selectedPlatform);
  }; 

    // --- NUEVO: Botón para ir a la página de reseñas ---
  const handleVerResenas = () => {
    navigate(`/review/${game.id}`);
  };

  return (
    <div className="card-game">
      <div className="image-container">
        <img src={game.image} alt={game.title} className="game-image" />
      </div>
        <div className="card-body">
          <div className="title-price-container">
            <h3 className="game-title">{game.title}</h3>
            <p className="game-price">${game.price}</p>
          </div>
          <div className="details">
            <div className="platform-selector">
              <label htmlFor={`platform-${game.id}`}>Plataforma:</label>
              <select
                id={`platform-${game.id}`}
                value={selectedPlatform}
                onChange={handlePlatformChange}
              >
                {game.platforms.split(', ').map((platform) => (
                  <option key={platform} value={platform}>
                    {platform.trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Añadir al Carro
          </button>
           {/* --- NUEVO BOTÓN: Ver reseñas --- */}
        <button className="view-reviews-button" onClick={handleVerResenas}>
          Ver Reseñas
        </button>
        </div>      
    </div>
  );
};

export default CardGame;