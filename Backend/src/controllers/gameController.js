import {
    getAllGames,
    createGame,
    deleteGame,
    getGameByIdWithComments
  } from '../models/gameModel.js'
  
  export const fetchGames = async (req, res) => {
    try {
      const games = await getAllGames()
      res.json(games)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  export const addGame = async (req, res) => {
    try {
      const newGame = await createGame(req.body)
      res.status(201).json(newGame)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  export const removeGame = async (req, res) => {
    try {
      await deleteGame(req.params.id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  // --- Nuevo endpoint: traer un juego con hasta 2 comentarios ---
export const fetchGameById = async (req, res) => {
  try {
    const gameId = req.params.id
    const game = await getGameByIdWithComments(gameId) // este método devuelve el juego + 2 comentarios
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' })
    res.json(game)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}