import { Router } from 'express'
import {
  fetchGames,
  fetchGameById,
  addGame,
  updateGame,
  removeGame
} from '../controllers/gameController.js'

const router = Router()

// Rutas del CRUD para los juegos
router.get('/', fetchGames) // GET: Trae todos los juegos
router.post('/', addGame) // POST: Crea un nuevo juego
router.put('/:id', updateGame) // PUT: Actualiza un juego existente
router.delete('/:id', removeGame) // DELETE: Elimina un juego
router.get('/:id', fetchGameById) // GET: Trae un solo juego por ID

export default router
