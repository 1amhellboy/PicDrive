import express from 'express';
import authRoutes from './routes/auth.routes'; 
import itemRoutes from './routes/item.routes';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes); // base path for auth routes
app.use('/api/items', itemRoutes);// base path for item function routes

app.get('/', (req, res) => {
  res.send('Welcome to PicDrive API');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
