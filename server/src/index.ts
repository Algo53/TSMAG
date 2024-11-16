import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ConnectToMongoDB } from './lib/databaseConnection';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import userRoutes from './routes/user.routes';

dotenv.config();
const app = express();
ConnectToMongoDB();

app.use(cors({
  origin: ["https://tsma.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});