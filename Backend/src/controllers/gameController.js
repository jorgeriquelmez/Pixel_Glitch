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
// Traer un juego por ID con comentarios (limit configurable)
export const fetchGameById = async (req, res) => {
  try {
    const gameId = req.params.id
    const limit = parseInt(req.query.limit) || 2
    const game = await getGameByIdWithComments(gameId, limit)
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' })

    // --- Cálculos propios para el frontend ---
    const distribucionEstrellas = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    let totalReviews = 0
    let sumaPuntaje = 0

    game.comentarios.forEach((c) => {
      const p = c.puntaje
      distribucionEstrellas[p] = (distribucionEstrellas[p] || 0) + 1
      totalReviews++
      sumaPuntaje += p
    })

    const ratingPromedio = totalReviews ? sumaPuntaje / totalReviews : 0

    res.json({
      ...game,
      ratingPromedio,
      totalReviews,
      distribucionEstrellas
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
