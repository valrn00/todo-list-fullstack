````markdown
# 🚀 Todo List

Aplicación completa (Fullstack) para la gestión de tareas, con una **API REST** construida en Node.js/Express y una **interfaz de usuario (UI)** moderna y responsive desarrollada con React y Vite.

## 🌟 Características Principales

* ✅ **Gestión Completa de Tareas (CRUD):** Crear, leer, actualizar y eliminar tareas.
* 🔍 **Filtros por Estado:** Filtrar tareas por estado (pendientes, completadas).
* 📊 **Estadísticas en Tiempo Real.**
* ⚡ **Manejo de Estados de Carga y Errores.**
* 📱 **Diseño Responsive** y **Interfaz Moderna.**

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnologías | Descripción |
| :--- | :--- | :--- |
| **Backend (API)** | **Node.js, Express.js, MongoDB (Mongoose), CORS, dotenv** | Provee la API REST para la persistencia de datos. |
| **Frontend (UI)** | **React 18, Vite, Axios, CSS3** | Interfaz de usuario que consume la API. |

---

## 📋 Configuración e Instalación Local

Asegúrate de tener **Node.js 18+** y **MongoDB** instalados y corriendo en tu sistema.

### 1. Clonar el Repositorio

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd todo-list-fullstack
````

### 2\. Configuración del Backend

Dirígete a la carpeta `backend` e instala las dependencias:

```bash
cd backend
npm install
```

**Variables de Entorno:**

1.  Copia el archivo de ejemplo: `cp .env.example .env`

2.  Edita el archivo `.env` con tu configuración. **Ejemplo:**

    ```env
    PORT=3000
    DATABASE_URL=tu_cadena_de_conexion_mongodb
    NODE_ENV=development
    ```

### 3\. Configuración del Frontend

Regresa a la raíz del proyecto y dirígete a la carpeta `frontend`:

```bash
cd ../frontend
npm install
```

**Variables de Entorno:**

1.  Copia el archivo de ejemplo: `cp .env.example .env`

2.  Edita el archivo `.env` para apuntar a tu API. **Ejemplo:**

    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

    *(Nota: Las variables de Vite deben empezar con `VITE_`)*

-----

## 🚀 Ejecución

### 1\. Iniciar el Backend (API)

Desde la carpeta `backend`:

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El backend se ejecutará por defecto en: `http://localhost:3000`

### 2\. Iniciar el Frontend (UI)

Desde la carpeta `frontend`:

```bash
# Desarrollo
npm run dev
```

El frontend se abrirá en: `http://localhost:5173`

-----

## 📡 Endpoints del Backend

El frontend consume la siguiente API:

| Método | Endpoint | Descripción | Cuerpo (POST/PUT) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/todos` | Lista todas las tareas. | - |
| **POST** | `/api/todos` | Crea una nueva tarea. | `{ "title": "...", "description": "...", "status": "pendiente" }` |
| **PUT** | `/api/todos/:id` | Actualiza una tarea por ID. | `{ "status": "completado" }` |
| **DELETE**| `/api/todos/:id` | Elimina una tarea por ID. | - |

-----

## 📁 Estructura del Proyecto

```
todo-list-fullstack/
├── backend/                  # Servidor API REST
│   ├── src/                  # Código fuente del backend
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/                 # Aplicación Cliente React
│   ├── src/                  # Código fuente del frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── package.json              # Opcional: para workspaces o scripts fullstack
└── README.md                 # Este archivo
```

-----

## 🌐 Despliegue

### Opciones Recomendadas

  * **Backend:** Render (fácil configuración de variables de entorno).
  * **Frontend:** Vercel (ideal para aplicaciones React/Vite).

### Pasos Generales (Ejemplo Vercel + Render)

1.  **Deploy del Backend (Ej. Render):**
      * Conecta el repositorio.
      * Configura el *Root Directory* a `backend/`.
      * Asegura las variables de entorno (`PORT`, `DATABASE_URL`, etc.).
2.  **Deploy del Frontend (Ej. Vercel):**
      * Conecta el repositorio.
      * Configura el *Root Directory* a `frontend/`.
      * Agrega la variable de entorno `VITE_API_URL` con la URL de tu API desplegada en Render.

-----

## 🧪 Pruebas Unitarias

Para ejecutar las pruebas del **Backend** (si están implementadas):

```bash
cd backend
npm test
```
AUTORES:       
```
Valery Sofia Gaona Prada
Nicolas Santiago Bayona Rodriguez  
```



