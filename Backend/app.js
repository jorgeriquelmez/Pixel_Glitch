import express from 'express';
import usersRoutes from './src/routes/userRoutes.js';
import checkoutRoutes from './src/routes/checkoutRoutes.js';
import gamesRoutes from './src/routes/gamesRoutes.js'; 

const app = express();

app.use(express.json());

// Rutas
app.use('/users', usersRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/games', gamesRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
