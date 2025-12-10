const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://todo-list-fullstack-valm00.vercel.app', // ⬅️ Reemplaza con TU URL de Vercel
    // Si no sabes tu URL aún, agrégala después del primer deploy
  ],
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Todo List API - v1.0' });
});

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

module.exports = app;