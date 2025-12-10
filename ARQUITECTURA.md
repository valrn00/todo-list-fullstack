# 🏗️ Arquitectura del Sistema Todo List

## 📊 Diagrama de Arquitectura (Nivel C4 - Contexto)

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIO                              │
│                    (Navegador Web)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                  Desplegado en Vercel                        │
│  - Componentes React                                         │
│  - Gestión de estado con Hooks                               │
│  - Llamadas API con Axios                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (HTTPS)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Express/Node.js)                   │
│                   Desplegado en Render                       │
│  - API REST                                                  │
│  - Controladores y Rutas                                     │
│  - Validación de datos                                       │
│  - Conexión a MongoDB                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ MongoDB Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BASE DE DATOS (MongoDB)                         │
│                 Alojada en Railway                           │
│  - Colección: todos                                          │
│  - Persistencia de datos                                     │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Diagrama de Arquitectura (Nivel C4 - Contenedores)

```
                          ┌───────────────┐
                          │   Usuario     │
                          └───────┬───────┘
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
         ┌──────────▼──────────┐    ┌───────────▼─────────┐
         │  Single Page App    │    │   Web Service       │
         │     (React)         │    │   (Express API)     │
         │  ┌──────────────┐   │    │  ┌──────────────┐   │
         │  │ Components   │   │    │  │  Routes      │   │
         │  │ - TodoForm   │◄──┼────┼─►│  - GET       │   │
         │  │ - TodoItem   │   │    │  │  - POST      │   │
         │  │ - TodoList   │   │    │  │  - PUT       │   │
         │  └──────────────┘   │    │  │  - DELETE    │   │
         │  ┌──────────────┐   │    │  └──────┬───────┘   │
         │  │   Services   │   │    │  ┌──────▼───────┐   │
         │  │  - api.js    │   │    │  │ Controllers  │   │
         │  └──────────────┘   │    │  └──────┬───────┘   │
         │                     │    │  ┌──────▼───────┐   │
         │   Vercel            │    │  │   Models     │   │
         └─────────────────────┘    │  └──────┬───────┘   │
                                    │         │           │
                                    │   Render│           │
                                    └─────────┼───────────┘
                                              │
                                    ┌─────────▼───────────┐
                                    │   MongoDB Database  │
                                    │   ┌─────────────┐   │
                                    │   │ Collection  │   │
                                    │   │   todos     │   │
                                    │   └─────────────┘   │
                                    │      Railway        │
                                    └─────────────────────┘
```

## 🧩 Componentes del Sistema

### 1. Frontend (React)

**Responsabilidad**: Interfaz de usuario interactiva

**Componentes principales:**
- `App.jsx`: Componente raíz, gestiona estado global
- `TodoForm.jsx`: Formulario para crear nuevas tareas
- `TodoItem.jsx`: Muestra y permite editar/eliminar tareas individuales

**Servicios:**
- `api.js`: Capa de abstracción para comunicación con el backend

**Características:**
- Gestión de estado con React Hooks (useState, useEffect)
- Manejo de errores y estados de carga
- Filtrado de tareas (todas, pendientes, completadas)
- Diseño responsive

### 2. Backend (Express/Node.js)

**Responsabilidad**: API REST y lógica de negocio

**Estructura de capas:**

#### Capa de Rutas (`routes/`)
Define los endpoints y los vincula con controladores
- `todoRoutes.js`: Rutas CRUD para tareas

#### Capa de Controladores (`controllers/`)
Lógica de negocio y manejo de peticiones
- `todoController.js`: 
  - getAllTodos: Lista todas las tareas
  - getTodoById: Obtiene una tarea específica
  - createTodo: Crea nueva tarea con validación
  - updateTodo: Actualiza tarea existente
  - deleteTodo: Elimina tarea

#### Capa de Modelos (`models/`)
Esquemas y modelos de datos
- `Todo.js`: Define estructura de datos con Mongoose

#### Capa de Configuración (`config/`)
Configuración de servicios externos
- `database.js`: Conexión a MongoDB

**Características:**
- Validación de datos de entrada
- Manejo centralizado de errores
- CORS habilitado para dominios permitidos
- Variables de entorno para configuración

### 3. Base de Datos (MongoDB)

**Responsabilidad**: Persistencia de datos

**Esquema de la colección `todos`:**

```javascript
{
  _id: ObjectId,
  title: String (requerido, max 200 caracteres),
  description: String (opcional),
  status: String (enum: 'pendiente' | 'completada'),
  createdAt: Date,
  updatedAt: Date
}
```

**Índices:**
- `_id`: Índice primario automático
- `createdAt`: Para ordenamiento eficiente

## 🔄 Flujo de Operaciones

### Crear una Tarea (POST /api/todos)

```
1. Usuario completa formulario en TodoForm
   ↓
2. TodoForm valida que el título no esté vacío
   ↓
3. Se llama a api.createTodo() con los datos
   ↓
4. Axios envía POST request a /api/todos
   ↓
5. Express router recibe la petición
   ↓
6. todoController.createTodo() valida datos
   ↓
7. Se crea documento en MongoDB usando el modelo Todo
   ↓
8. MongoDB retorna el documento creado
   ↓
9. Backend envía respuesta 201 con la tarea creada
   ↓
10. Frontend actualiza el estado y muestra la nueva tarea
```

### Listar Tareas (GET /api/todos)

```
1. Componente App se monta (useEffect)
   ↓
2. Se llama a api.getAllTodos()
   ↓
3. Backend consulta MongoDB (Todo.find())
   ↓
4. Tareas ordenadas por fecha de creación
   ↓
5. Backend envía array de tareas
   ↓
6. Frontend actualiza estado y renderiza TodoItem por cada tarea
```

### Actualizar Tarea (PUT /api/todos/:id)

```
1. Usuario hace clic en checkbox o botón editar
   ↓
2. TodoItem llama a onUpdate con nuevos datos
   ↓
3. App llama a api.updateTodo(id, data)
   ↓
4. Backend busca tarea por ID
   ↓
5. Actualiza campos modificados
   ↓
6. Guarda en MongoDB
   ↓
7. Retorna tarea actualizada
   ↓
8. Frontend actualiza el estado local
```

### Eliminar Tarea (DELETE /api/todos/:id)

```
1. Usuario hace clic en botón eliminar
   ↓
2. Se muestra confirmación (window.confirm)
   ↓
3. Si confirma, App llama a api.deleteTodo(id)
   ↓
4. Backend busca y elimina tarea de MongoDB
   ↓
5. Retorna confirmación de eliminación
   ↓
6. Frontend filtra la tarea del estado local
```

## 🚀 Pipeline de CI/CD

### GitHub Actions Workflow

```
┌─────────────────────────────────────────┐
│  Trigger: push o pull_request          │
│  Ramas: main, develop                   │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴─────────┐
        │                  │
┌───────▼────────┐  ┌──────▼──────────┐
│ Frontend Build │  │ Backend Test    │
└───────┬────────┘  └──────┬──────────┘
        │                  │
        │  1. Checkout     │  1. Checkout
        │  2. Setup Node   │  2. Setup Node
        │  3. npm ci       │  3. npm ci
        │  4. npm build    │  4. npm test
        │  5. Upload       │
        │     artifacts    │
        │                  │
        └────────┬─────────┘
                 │
        ┌────────▼────────────┐
        │ Pipeline Success    │
        │ ✓ Build OK          │
        │ ✓ Tests Passed      │
        └─────────────────────┘
```

**Acciones ejecutadas:**

1. **Instalación**: npm ci (instala dependencias exactas)
2. **Build Frontend**: Compila React para producción
3. **Tests Backend**: Ejecuta suite de pruebas
4. **Validación**: Pipeline falla si hay errores

## 🔒 Seguridad y Mejores Prácticas

### Variables de Entorno

**Frontend:**
- `VITE_API_URL`: URL del backend (pública, prefijo VITE_ requerido)

**Backend:**
- `DATABASE_URL`: Cadena de conexión (privada)
- `PORT`: Puerto del servidor
- `NODE_ENV`: Entorno de ejecución

### CORS

El backend permite peticiones desde:
- localhost (desarrollo)
- Dominio de Vercel (producción)

### Validación

- Frontend: Validación inmediata en formularios
- Backend: Validación en controladores + esquema Mongoose

## 📈 Escalabilidad

### Horizontal
- Frontend: CDN de Vercel escala automáticamente
- Backend: Render puede escalar instancias
- Base de datos: Railway ofrece planes escalables

### Vertical
- Optimización de consultas MongoDB con índices
- Paginación para listas grandes de tareas
- Caché de respuestas frecuentes

## 🔍 Monitoreo

### Logs
- Render: Logs de aplicación en tiempo real
- Vercel: Analytics y logs de despliegue
- Railway: Métricas de base de datos

### Métricas importantes
- Tiempo de respuesta de API
- Tasa de errores
- Uso de base de datos
- Tiempo de carga del frontend

## 🚧 Mejoras Futuras

1. **Autenticación**: JWT para usuarios múltiples
2. **Testing**: Tests unitarios y de integración
3. **Caché**: Redis para respuestas frecuentes
4. **WebSockets**: Actualizaciones en tiempo real
5. **PWA**: Funcionalidad offline
6. **Búsqueda**: Búsqueda de tareas por texto
7. **Categorías**: Organización por categorías/tags