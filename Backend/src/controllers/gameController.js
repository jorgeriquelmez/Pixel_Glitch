import {
  createGame,
  updateGame,
  deleteGame,
  getGames,
  getGameById
} from '../models/gameModel.js';

export const fetchGames = async (req, res) => {
  try {
    const games = await getGames();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
};

export const addGame = async (req, res) => {
  try {
    console.log('POST request to /api/games received');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log('Empty request body received');
      return res.status(400).json({ error: 'Request body is required' });
    }

    
    const newGame = await createGame(req.body);

    
    if (!newGame?.id) {
      return res.status(500).json({ error: 'No se pudo obtener ID del nuevo juego' });
    }

    
    const completeGame = await getGameById(newGame.id);

    res.status(201).json(completeGame);
  } catch (err) {
    console.error('Error al crear juego:', err);
    res.status(500).json({ error: 'Error al crear juego' });
  }
};

export const editGame = async (req, res) => {
  try {
    const updated = await updateGame(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('Error al editar juego:', err);
    res.status(500).json({ error: 'Error al editar juego' });
  }
};

export const removeGame = async (req, res) => {
  try {
    await deleteGame(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Error al eliminar juego:', err);
    res.status(500).json({ error: 'Error al eliminar juego' });
  }
};

