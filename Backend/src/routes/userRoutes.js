import express from 'express';
import { register, login, profile, listUsers, updateUser, deleteUser } from '../controllers/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', listUsers);
router.put('/:id', updateUser); // actualizar usuario
router.delete('/:id', deleteUser); // ✅ eliminar usuario

export default router;