import React from 'react';
import { useParams } from 'react-router-dom';
import gamesData from './data/games.json';
import './GamesDisplay.css'; // Puedes reutilizar los estilos de GamesDisplay

const GenrePage = () => {
  const { genreName } = useParams();

  const filteredGames = gamesData.filter(game =>
    game.genre.toLowerCase().includes(genreName.toLowerCase())
  );

  return (
    <div className="games-display-container">
      <h1 className="text-center my-4">Juegos de {genreName}</h1>
      <div className="game-cards-container">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.title} />
              <div className="game-info">
                <h3>{game.title}</h3>
                <p>Género: {game.genre}</p>
                <p>Plataformas: {game.platforms}</p>
                <p>Precio: {game.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron juegos para este género.</p>
        )}
      </div>
    </div>
  );
};

export default GenrePage;