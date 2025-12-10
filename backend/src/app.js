app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tu-proyecto.vercel.app' // Agrega tu URL de Vercel
  ],
  credentials: true
}));