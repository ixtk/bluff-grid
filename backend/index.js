import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);

app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
