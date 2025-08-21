import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import GameRow from './GameRow';
import './AdminPage.css';

export default function AdminPage() {
  const { games, setGames } = useContext(AppContext);
  const [formData, setFormData] = useState({
    nombre: '',
    plataforma: '',
    precio: '',
    imagen: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Agregar nuevo juego
  const handleAdd = async () => {
    if (!formData.nombre) return;

    try {
      const res = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al crear juego');

      const newGame = await res.json();

      // Normalizar propiedades para frontend
      const normalized = {
        id: newGame.id,
        nombre: newGame.nombre || newGame.nombreJuego,
        plataforma: newGame.plataforma,
        precio: newGame.precio || newGame.precioJuego,
        imagen: newGame.imagen
      };

      setGames([...games, normalized]);
      setFormData({ nombre: '', plataforma: '', precio: '', imagen: '' });
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Eliminar juego
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

      <label>Nombre</label>
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre del juego"
      />

      <label>Plataforma</label>
      <input
        name="plataforma"
        value={formData.plataforma}
        onChange={handleChange}
        placeholder="PC / Xbox / PlayStation"
      />

      <label>Precio</label>
      <input
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        placeholder="Ingresa precio"
      />

      <label>Imagen</label>
      <input
        name="imagen"
        value={formData.imagen}
        onChange={handleChange}
        placeholder="URL de portada"
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
