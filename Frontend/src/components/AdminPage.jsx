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
        popularity: '',
    });

    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch('https://pixel-glitch.onrender.com/api/games');
                if (!res.ok) throw new Error('Error al obtener juegos');
                const data = await res.json();
                setGames(data);
            } catch (error) {
                console.error("Error cargando juegos en AdminPage:", error);
            }
        };
        fetchGames();
    }, [setGames]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        if (!formData.title) return;
        const dataToSend = {
            ...formData,
            price: Number(formData.price),
            popularity: Number(formData.popularity),
        };
        try {
            const res = await fetch('https://pixel-glitch.onrender.com/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
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
                popularity: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (!formData.title || !editingId) return;
        const dataToSend = {
            ...formData,
            price: Number(formData.price),
            popularity: Number(formData.popularity),
        };
        try {
            const res = await fetch(`https://pixel-glitch.onrender.com/api/games/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            if (!res.ok) throw new Error('Error al actualizar juego');
            const updatedGame = await res.json();
            setGames(games.map((game) => (game.id === editingId ? updatedGame : game)));
            handleCancel();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://pixel-glitch.onrender.com/api/games/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Error al eliminar juego');
            setGames(games.filter((g) => g.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (game) => {
        setEditing(true);
        setEditingId(game.id);
        setFormData({
            title: game.title,
            platforms: game.platforms,
            price: game.price,
            image: game.image,
            genre: game.genre,
            release_date: game.release_date,
            popularity: game.popularity,
        });
    };

    const handleCancel = () => {
        setEditing(false);
        setEditingId(null);
        setFormData({
            title: '',
            platforms: '',
            price: '',
            image: '',
            genre: '',
            release_date: '',
            popularity: '',
        });
    };

    return (
        <div className="admin-container">
            <h2>{editing ? 'Editar juego' : 'Agregar nuevo juego'}</h2>
            <label>Título</label>
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título del juego"
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
            <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required // Agregado para que sea un campo obligatorio
            >
                <option value="">Selecciona un género</option>
                <option value="Acción">Acción</option>
                <option value="Deportes">Deportes</option>
                <option value="RPG">RPG</option>
                <option value="Simulador">Simulador</option>
                <option value="Aventura">Aventura</option>
                <option value="Estrategia">Estrategia</option>
            </select>
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
            {editing ? (
                <>
                    <button className="btn-update" onClick={handleUpdate}>
                        Actualizar juego
                    </button>
                    <button className="btn-cancel" onClick={handleCancel}>
                        Cancelar
                    </button>
                </>
            ) : (
                <button className="btn-add" onClick={handleAdd}>
                    Agregar juego
                </button>
            )}
            <h3>Listado de Juegos</h3>
            <table className="game-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Plataforma</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {games &&
                        games.map((j, i) => (
                            <GameRow
                                key={j.id || i}
                                idx={i}
                                juego={j}
                                onEdit={() => handleEdit(j)}
                                onDelete={() => handleDelete(j.id)}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}