import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/index.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/categories', categoryRoutes);

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => console.log(`Server on http://localhost:${port}`));
});