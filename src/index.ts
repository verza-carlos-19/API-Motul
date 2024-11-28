import express from 'express';
import userRoutes from './routes/userRoutes';
import productsRoutes from './routes/productsRoutes'
import cors from 'cors';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
 app.use(cors());
 app.use('/auth', userRoutes);
app.use('/products', productsRoutes);

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto'+port);
});