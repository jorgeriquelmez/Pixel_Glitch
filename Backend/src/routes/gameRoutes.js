import { Router } from 'express'
import {
  fetchGames,
  addGame,
  removeGame
} from '../controllers/gameController.js'

const router = Router()

router.get('/', fetchGames)
router.post('/', addGame)
router.delete('/:id', removeGame)

export default router
