# 📡 Documentación de API - Todo List

## Base URL

**Desarrollo**: `http://localhost:3000/api`  
**Producción**: `https://tu-app.onrender.com/api`

## Formato de Respuesta

Todas las respuestas exitosas siguen este formato:

```json
{
  "success": true,
  "data": {},
  "count": 0,
  "message": ""
}
```

Las respuestas de error siguen este formato:

```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

---

## Endpoints

### 1. Obtener todas las tareas

**GET** `/todos`

Retorna la lista completa de tareas ordenadas por fecha de creación (más recientes primero).

#### Request

```http
GET /api/todos HTTP/1.1
Host: tu-app.onrender.com
```

#### Response Success (200)

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6547abc123def456789",
      "title": "Completar proyecto final",
      "description": "Terminar el proyecto fullstack de todo list",
      "status": "pendiente",
      "createdAt": "2024-12-09T10:30:00.000Z",
      "updatedAt": "2024-12-09T10:30:00.000Z"
    },
    {
      "_id": "6547abc987def123456",
      "title": "Estudiar React",
      "description": "",
      "status": "completada",
      "createdAt": "2024-12-08T15:20:00.000Z",
      "updatedAt": "2024-12-09T09:00:00.000Z"
    }
  ]
}
```

#### Response Error (500)

```json
{
  "success": false,
  "error": "Error al conectar con la base de datos"
}
```

---

### 2. Obtener una tarea específica

**GET** `/todos/:id`

Retorna los detalles de una tarea específica por su ID.

#### Request

```http
GET /api/todos/6547abc123def456789 HTTP/1.1
Host: tu-app.onrender.com
```

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "_id": "6547abc123def456789",
    "title": "Completar proyecto final",
    "description": "Terminar el proyecto fullstack de todo list",
    "status": "pendiente",
    "createdAt": "2024-12-09T10:30:00.000Z",
    "updatedAt": "2024-12-09T10:30:00.000Z"
  }
}
```

#### Response Error (404)

```json
{
  "success": false,
  "error": "Todo not found"
}
```

---

### 3. Crear una nueva tarea

**POST** `/todos`

Crea una nueva tarea en el sistema.

#### Request

```http
POST /api/todos HTTP/1.1
Host: tu-app.onrender.com
Content-Type: application/json

{
  "title": "Nueva tarea",
  "description": "Descripción opcional de la tarea",
  "status": "pendiente"
}
```

#### Request Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | Sí | Título de la tarea (max 200 caracteres) |
| description | string | No | Descripción detallada de la tarea |
| status | string | No | Estado: 'pendiente' o 'completada' (default: 'pendiente') |

#### Response Success (201)

```json
{
  "success": true,
  "data": {
    "_id": "6547new123def456789",
    "title": "Nueva tarea",
    "description": "Descripción opcional de la tarea",
    "status": "pendiente",
    "createdAt": "2024-12-09T14:45:00.000Z",
    "updatedAt": "2024-12-09T14:45:00.000Z"
  }
}
```

#### Response Error (400)

**Título vacío:**
```json
{
  "success": false,
  "error": "Title is required"
}
```

**Título muy largo:**
```json
{
  "success": false,
  "error": "Title cannot exceed 200 characters"
}
```

**Estado inválido:**
```json
{
  "success": false,
  "error": "status must be either 'pendiente' or 'completada'"
}
```

---

### 4. Actualizar una tarea

**PUT** `/todos/:id`

Actualiza los datos de una tarea existente.

#### Request

```http
PUT /api/todos/6547abc123def456789 HTTP/1.1
Host: tu-app.onrender.com
Content-Type: application/json

{
  "title": "Título actualizado",
  "description": "Nueva descripción",
  "status": "completada"
}
```

#### Request Body

Todos los campos son opcionales. Solo los campos enviados serán actualizados.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| title | string | Nuevo título (max 200 caracteres) |
| description | string | Nueva descripción |
| status | string | Nuevo estado: 'pendiente' o 'completada' |

#### Response Success (200)

```json
{
  "success": true,
  "data": {
    "_id": "6547abc123def456789",
    "title": "Título actualizado",
    "description": "Nueva descripción",
    "status": "completada",
    "createdAt": "2024-12-09T10:30:00.000Z",
    "updatedAt": "2024-12-09T15:00:00.000Z"
  }
}
```

#### Response Error (404)

```json
{
  "success": false,
  "error": "Todo not found"
}
```

#### Response Error (400)

```json
{
  "success": false,
  "error": "Invalid data format"
}
```

---

### 5. Eliminar una tarea

**DELETE** `/todos/:id`

Elimina permanentemente una tarea del sistema.

#### Request

```http
DELETE /api/todos/6547abc123def456789 HTTP/1.1
Host: tu-app.onrender.com
```

#### Response Success (200)

```json
{
  "success": true,
  "data": {},
  "message": "Todo deleted successfully"
}
```

#### Response Error (404)

```json
{
  "success": false,
  "error": "Todo not found"
}
```

---

## Códigos de Estado HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| 200 | OK | Operación exitosa (GET, PUT, DELETE) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 400 | Bad Request | Datos inválidos o falta información requerida |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor o base de datos |

---

## Ejemplos de Uso

### JavaScript (Fetch API)

```javascript
// Obtener todas las tareas
const getAllTodos = async () => {
  const response = await fetch('https://tu-app.onrender.com/api/todos');
  const data = await response.json();
  return data.data;
};

// Crear una tarea
const createTodo = async (todoData) => {
  const response = await fetch('https://tu-app.onrender.com/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData)
  });
  const data = await response.json();
  return data.data;
};

// Actualizar una tarea
const updateTodo = async (id, todoData) => {
  const response = await fetch(`https://tu-app.onrender.com/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData)
  });
  const data = await response.json();
  return data.data;
};

// Eliminar una tarea
const deleteTodo = async (id) => {
  const response = await fetch(`https://tu-app.onrender.com/api/todos/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
};
```

### cURL

```bash
# Obtener todas las tareas
curl -X GET https://tu-app.onrender.com/api/todos

# Crear una tarea
curl -X POST https://tu-app.onrender.com/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Nueva tarea","description":"Descripción","status":"pendiente"}'

# Actualizar una tarea
curl -X PUT https://tu-app.onrender.com/api/todos/6547abc123def456789 \
  -H "Content-Type: application/json" \
  -d '{"status":"completada"}'

# Eliminar una tarea
curl -X DELETE https://tu-app.onrender.com/api/todos/6547abc123def456789
```

### Python (requests)

```python
import requests

BASE_URL = "https://tu-app.onrender.com/api"

# Obtener todas las tareas
def get_all_todos():
    response = requests.get(f"{BASE_URL}/todos")
    return response.json()['data']

# Crear una tarea
def create_todo(todo_data):
    response = requests.post(
        f"{BASE_URL}/todos",
        json=todo_data
    )
    return response.json()['data']

# Actualizar una tarea
def update_todo(todo_id, todo_data):
    response = requests.put(
        f"{BASE_URL}/todos/{todo_id}",
        json=todo_data
    )
    return response.json()['data']

# Eliminar una tarea
def delete_todo(todo_id):
    response = requests.delete(f"{BASE_URL}/todos/{todo_id}")
    return response.json()
```

---

## Testing con Postman

### Colección Postman

Puedes importar esta colección en Postman para probar todos los endpoints:

```json
{
  "info": {
    "name": "Todo List API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Todos",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/todos"
      }
    },
    {
      "name": "Create Todo",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/todos",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Test task\",\n  \"description\": \"Test description\",\n  \"status\": \"pendiente\"\n}"
        }
      }
    },
    {
      "name": "Update Todo",
      "request": {
        "method": "PUT",
        "url": "{{base_url}}/todos/{{todo_id}}",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"completada\"\n}"
        }
      }
    },
    {
      "name": "Delete Todo",
      "request": {
        "method": "DELETE",
        "url": "{{base_url}}/todos/{{todo_id}}"
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "https://tu-app.onrender.com/api"
    },
    {
      "key": "todo_id",
      "value": ""
    }
  ]
}
```

---

## Manejo de Errores

### Errores Comunes

1. **CORS Error**: Asegúrate de que el frontend está en la lista de orígenes permitidos
2. **Connection Timeout**: Verifica que el backend esté activo en Render
3. **Database Connection Error**: Revisa que la cadena DATABASE_URL sea correcta
4. **Invalid ObjectId**: El ID de la tarea debe ser un ObjectId válido de MongoDB

### Debugging

```javascript
// Ejemplo de manejo de errores en el frontend
try {
  const response = await todoAPI.createTodo(todoData);
  console.log('Success:', response);
} catch (error) {
  if (error.response) {
    // Error de respuesta del servidor
    console.error('Error status:', error.response.status);
    console.error('Error data:', error.response.data);
  } else if (error.request) {
    // No se recibió respuesta
    console.error('No response received');
  } else {
    // Error al configurar la petición
    console.error('Error:', error.message);
  }
}
```

---

## Límites y Consideraciones

- **Rate Limiting**: No implementado actualmente (recomendado para producción)
- **Tamaño máximo de payload**: 100kb (configuración por defecto de Express)
- **Timeout**: 30 segundos en Render
- **Autenticación**: No requerida (considerar JWT para producción)