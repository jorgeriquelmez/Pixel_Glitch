import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import GameRow from './GameRow'
import './AdminPage.css'

export default function AdminPage() {
  const { games, setGames, cart, setCart } = useContext(AppContext)
  const [formData, setFormData] = useState({
    nombre: '',
    plataforma: '',
    precio: '',
    imagen: ''
  })

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleAdd = () => {
    if (!formData.nombre) return
    const newGame = { ...formData }
    setGames([...games, newGame])
    setCart([...cart, { ...newGame, qty: 1 }])
    setFormData({ nombre: '', plataforma: '', precio: '', imagen: '' })
  }

  const handleDelete = idx =>
    setGames(games.filter((_, i) => i !== idx))

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
          {games.map((j, i) => (
            <GameRow
              key={i}
              idx={i}
              juego={j}
              onDelete={() => handleDelete(i)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
