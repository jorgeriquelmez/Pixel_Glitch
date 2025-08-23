import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import GameRow from './GameRow';
import './AdminPage.css';

export default function AdminPage() {
  const { games, setGames } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: '',
    platforms: '',
    price: '',
    image: '',
    genre: '',
    release_date: '',
    popularity: ''
  });

  // 
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/games');
        if (!res.ok) throw new Error('Error al obtener juegos');
        const data = await res.json();

        
        const normalized = data.map(g => ({
          id: g.id,
          title: g.title,
          platforms: g.platforms,
          price: g.price,
          image: g.image,
          genre: g.genre,
          release_date: g.release_date,
          popularity: g.popularity
        }));

        setGames(normalized);
      } catch (error) {
        console.error("Error cargando juegos en AdminPage:", error);
      }
    };

    if (games.length === 0) {
      fetchGames(); // solo si aún no hay
    }
  }, [games, setGames]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    if (!formData.title) return;

    try {
      const res = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al crear juego');

      const newGame = await res.json();

      setGames([...games, newGame]);

      setFormData({
        title: '',
        platforms: '',
        price: '',
        image: '',
        genre: '',
        release_date: '',
        popularity: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar juego');

      setGames(games.filter((g) => g.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Agregar nuevo juego</h2>

      <label>Título</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Nombre del juego"
      />

      <label>Plataformas</label>
      <input
        name="platforms"
        value={formData.platforms}
        onChange={handleChange}
        placeholder="PC / Xbox / PS5"
      />

      <label>Precio</label>
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        type="number"
      />

      <label>Imagen</label>
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL imagen"
      />

      <label>Género</label>
      <input
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        placeholder="Ej: Acción"
      />

      <label>Fecha de lanzamiento</label>
      <input
        name="release_date"
        value={formData.release_date}
        onChange={handleChange}
        type="date"
      />

      <label>Popularidad</label>
      <input
        name="popularity"
        value={formData.popularity}
        onChange={handleChange}
        type="number"
        step="0.1"
        placeholder="0.0 a 10.0"
      />

      <button className="btn-add" onClick={handleAdd}>
        Agregar juego
      </button>

      <h3>Listado de Juegos</h3>
      <table className="game-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Precio</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          {games &&
            games.map((j, i) => (
              <GameRow
                key={j.id || i}
                idx={i}
                juego={j}
                onDelete={() => handleDelete(j.id)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}







