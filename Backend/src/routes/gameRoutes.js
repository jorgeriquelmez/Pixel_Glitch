import { Router } from 'express'
import {
  fetchGames,
  fetchGameById,
  addGame,
  updateGame,
  removeGame
} from '../controllers/gameController.js'

const router = Router()

router.get('/', fetchGames)
router.post('/', addGame)
router.put('/:id', updateGame)
router.delete('/:id', removeGame)
router.get('/:id', fetchGameById)

export default router
