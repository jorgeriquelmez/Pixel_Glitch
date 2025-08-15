import express from 'express';
import usersRoutes from './src/routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));