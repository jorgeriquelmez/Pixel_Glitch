import {
  getAllGames,
  createGame,
  updateGame as updateGameModel,
  deleteGame,
  getGameByIdWithComments
} from '../models/gameModel.js'

// GET: Trae todos los juegos
export const fetchGames = async (req, res) => {
  try {
    const games = await getAllGames()
    res.json(games)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET: Trae un juego por ID con la lógica de estrellas
export const fetchGameById = async (req, res) => {
  try {
    const gameId = req.params.id
    const game = await getGameByIdWithComments(gameId)
    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' })
    }

    // Lógica para la distribución de estrellas y rating promedio
    const distribucionEstrellas = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    let totalReviews = 0
    let sumaPuntaje = 0

    if (game.comentarios) {
      game.comentarios.forEach((c) => {
        const p = c.puntaje
        distribucionEstrellas[p] = (distribucionEstrellas[p] || 0) + 1
        totalReviews++
        sumaPuntaje += p
      })
    }

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

// POST: Crea un nuevo juego
export const addGame = async (req, res) => {
  try {
    const newGame = await createGame(req.body)
    res.status(201).json(newGame)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// PUT: Actualiza un juego existente
export const updateGame = async (req, res) => {
  try {
    const { id } = req.params
    const updatedGame = await updateGameModel(id, req.body)
    res.status(200).json(updatedGame)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE: Elimina un juego
export const removeGame = async (req, res) => {
  try {
    const { id } = req.params
    await deleteGame(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
