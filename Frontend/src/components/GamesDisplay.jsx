import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './GamesDisplay.css';
import CardGame from './CardGame';

const GamesDisplay = () => {
  const { games, setGames } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const initialGenre = searchParams.get('genre') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState(initialGenre);
  const [priceRangeFilter, setPriceRangeFilter] = useState('');

  const getInitialSortBy = () => {
    if (location.pathname === '/top-ventas') {
      return 'Popularidad';
    }
    return 'Precio';
  };

  const [sortBy, setSortBy] = useState(getInitialSortBy());

  useEffect(() => {
    if (games.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchGames = async () => {
      try {
        // const response = await fetch('https://pixel-glitch.onrender.com/api/games');
        const response = await fetch('https://localhost:3000/api/games');
        if (!response.ok) {
          throw new Error('Error al obtener los juegos');
        }
        const gamesData = await response.json();
        setGames(gamesData);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGames();
  }, []);

  const platforms = useMemo(() => {
    if (games.length === 0) return [];
    const allPlatforms = games.flatMap(game => (game.platforms ? game.platforms.split(', ') : []));
    return [...new Set(allPlatforms)];
  }, [games]);

  const genres = useMemo(() => {
    if (games.length === 0) return [];
    return [...new Set(games.map(game => game.genre))];
  }, [games]);

  const priceRanges = ['0-20', '20-50', '50+'];

  const filteredAndSortedGames = useMemo(() => {
    let filteredGames = [...games];

    if (searchQuery) {
      filteredGames = filteredGames.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (platformFilter) {
      filteredGames = filteredGames.filter(game =>
        game.platforms.includes(platformFilter)
      );
    }

    if (genreFilter) {
      filteredGames = filteredGames.filter(game =>
        game.genre.toLowerCase() === genreFilter.toLowerCase()
      );
    }

    if (priceRangeFilter) {
      filteredGames = filteredGames.filter(game => {
        const price = game.price;
        if (priceRangeFilter === '0-20') return price >= 0 && price <= 20;
        if (priceRangeFilter === '20-50') return price > 20 && price <= 50;
        if (priceRangeFilter === '50+') return price > 50;
        return true;
      });
    }

    filteredGames.sort((a, b) => {
      if (sortBy === 'Precio') {
        return a.price - b.price;
      }
      if (sortBy === 'Fecha de Lanzamiento') {
        return new Date(b.release_date) - new Date(a.release_date);
      }
      if (sortBy === 'Popularidad') {
        return b.popularity - a.popularity;
      }
      return 0;
    });
    return filteredGames;
  }, [games, searchQuery, platformFilter, genreFilter, priceRangeFilter, sortBy]);

  if (isLoading) {
    return <div className="text-center my-5">Cargando juegos...</div>;
  }

  if (error) {
    return <div className="text-center my-5">Error: {error}</div>;
  }

  return (
    <div className="games-display-container">
      <h1 className="main-title">
        {location.pathname === '/top-ventas' ? 'Juegos más Populares' : 'Explora los juegos'}
      </h1>
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="dropdowns">
          <select className="dropdown" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            <option value="">Plataforma</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select className="dropdown" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">Genero</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select className="dropdown" value={priceRangeFilter} onChange={(e) => setPriceRangeFilter(e.target.value)}>
            <option value="">Rango de precio</option>
            {priceRanges.map(pr => <option key={pr} value={pr}>{pr}</option>)}
          </select>
        </div>
      </div>
      <div className="sort-section">
        <h2 className="sort-title">Ordenado por</h2>
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortBy === 'Precio' ? 'active' : ''}`}
            onClick={() => setSortBy('Precio')}
          >
            Precio
          </button>
          <button
            className={`sort-button ${sortBy === 'Fecha de Lanzamiento' ? 'active' : ''}`}
            onClick={() => setSortBy('Fecha de Lanzamiento')}
          >
            Fecha de Lanzamiento
          </button>
          <button
            className={`sort-button ${sortBy === 'Popularidad' ? 'active' : ''}`}
            onClick={() => setSortBy('Popularidad')}
          >
            Popularidad
          </button>
        </div>
      </div>
      <div className="games-grid">
        {filteredAndSortedGames.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesDisplay;