import express from 'express'
import cors from 'cors'
import usersRoutes from './src/routes/userRoutes.js'
import checkoutRoutes from './src/routes/checkoutRoutes.js'
import gamesRoutes from './src/routes/gameRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// app.use(cors({ origin: 'http://localhost:5173' }))
app.use(cors({ origin: 'https://pixel-glitch-ap85.vercel.app' }))
app.use(express.json())

// Rutas
app.use('/users', usersRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/games', gamesRoutes)
app.use('/api/cart', cartRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
