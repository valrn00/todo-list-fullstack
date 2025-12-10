# 🚀 Todo List - Backend

API REST para gestión de tareas construida con Express y MongoDB.

## 🛠️ Tecnologías

- Node.js 18+
- Express.js
- MongoDB con Mongoose
- CORS
- dotenv

## 📋 Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus credenciales
```

## 🔧 Configuración

Edita el archivo `.env`:

```env
PORT=3000
DATABASE_URL=tu_cadena_de_conexion_mongodb
NODE_ENV=development
```

## 🚀 Ejecución

```bash
# Desarrollo con nodemon
npm run dev

# Producción
npm start
```

## 📡 Endpoints

### GET /api/todos
Lista todas las tareas

### POST /api/todos
Crea una nueva tarea
```json
{
  "title": "Mi tarea",
  "description": "Descripción opcional",
  "status": "pendiente"
}
```

### PUT /api/todos/:id
Actualiza una tarea

### DELETE /api/todos/:id
Elimina una tarea

## 📁 Estructura

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── app.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🧪 Testing

```bash
npm test
```

## 🌐 Despliegue

### Render

1. Conecta tu repositorio
2. Configura las variables de entorno
3. Deploy automático en cada push

## 📝 Notas

- Asegúrate de tener MongoDB corriendo
- El puerto por defecto es 3000
- CORS está habilitado para desarrollo