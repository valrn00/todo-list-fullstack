# 🎨 Todo List - Frontend

Aplicación React para gestión de tareas con diseño moderno y responsive.

## 🛠️ Tecnologías

- React 18
- Vite
- Axios
- CSS3

## 📋 Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con la URL de tu API
```

## 🔧 Configuración

Edita el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

**Importante**: En Vite, las variables de entorno DEBEN empezar con `VITE_`

## 🚀 Ejecución

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

La aplicación se abrirá en: http://localhost:5173

## 📁 Estructura

```
frontend/
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx
│   │   └── TodoItem.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## ✨ Características

- ✅ Crear, leer, actualizar y eliminar tareas
- 🔍 Filtrar tareas por estado (todas, pendientes, completadas)
- 📊 Estadísticas en tiempo real
- ⚡ Estados de carga y manejo de errores
- 📱 Diseño responsive
- 🎨 Interfaz moderna con gradientes

## 🌐 Despliegue

### Vercel

1. Conecta tu repositorio
2. Configura Root Directory: `frontend`
3. Agrega variable de entorno: `VITE_API_URL`
4. Deploy automático

## 🔗 API

El frontend consume estos endpoints:
- `GET /api/todos` - Listar tareas
- `POST /api/todos` - Crear tarea
- `PUT /api/todos/:id` - Actualizar tarea
- `DELETE /api/todos/:id` - Eliminar tarea