import { Router } from 'express'
import { getGameById } from '../controllers/reviews.js'
import {
  fetchGames,
  addGame,
  removeGame
} from '../controllers/gameController.js'

const router = Router()

router.get('/', fetchGames)
router.post('/', addGame)
router.delete('/:id', removeGame)
router.get('/:id', getGameById)

export default router
