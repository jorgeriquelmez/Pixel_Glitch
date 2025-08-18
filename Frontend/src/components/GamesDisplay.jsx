import React, { useState, useMemo } from 'react';
import gamesData from '../data/games.json';
import { useSearchParams } from 'react-router-dom';
import './GamesDisplay.css';
import CardGame from './CardGame'; // Import the new component

const GamesDisplay = () => {
 const [searchParams] = useSearchParams();
 const initialGenre = searchParams.get('genre') || '';
 const [searchQuery, setSearchQuery] = useState('');
 const [platformFilter, setPlatformFilter] = useState('');
 const [genreFilter, setGenreFilter] = useState(initialGenre);
 const [priceRangeFilter, setPriceRangeFilter] = useState('');
 const [sortBy, setSortBy] = useState('Precio');

 const platforms = [...new Set(gamesData.flatMap(game => game.platforms.split(', ')))];
 const genres = [...new Set(gamesData.map(game => game.genre))];
 const priceRanges = ['0-20', '20-50', '50+'];

 const filteredAndSortedGames = useMemo(() => {
   let filteredGames = [...gamesData];

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
       return new Date(b.releaseDate) - new Date(a.releaseDate);
     }
     if (sortBy === 'Popularidad') {
       return b.popularity - a.popularity;
     }
     return 0;
   });

   return filteredGames;
 }, [searchQuery, platformFilter, genreFilter, priceRangeFilter, sortBy]);

 return (
   <div className="games-display-container">
     <h1 className="main-title">Explora los juegos</h1>

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
           <option value="">Genero </option>
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
       {filteredAndSortedGames.map((game, index) => (
         <CardGame key={index} game={game} /> 
       ))}
     </div>
   </div>
 );
};

export default GamesDisplay;