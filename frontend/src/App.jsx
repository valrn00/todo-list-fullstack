import { useState, useEffect } from 'react';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoAPI.getAllTodos();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas. Por favor, intenta de nuevo.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos([response.data, ...todos]);
    } catch (err) {
      setError('Error al crear la tarea');
      console.error('Error creating todo:', err);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const response = await todoAPI.updateTodo(id, todoData);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await todoAPI.deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (err) {
        setError('Error al eliminar la tarea');
        console.error('Error deleting todo:', err);
      }
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'pendiente') return todo.status === 'pendiente';
    if (filter === 'completada') return todo.status === 'completada';
    return true;
  });

  const stats = {
    total: todos.length,
    pendiente: todos.filter(t => t.status === 'pendiente').length,
    completada: todos.filter(t => t.status === 'completada').length
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo List</h1>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Pendientes: {stats.pendiente}</span>
          <span>Completadas: {stats.completada}</span>
        </div>
      </header>

      <main className="app-main">
        <TodoForm onAdd={handleAddTodo} />

        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <div className="todos-section">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button 
              className={filter === 'pendiente' ? 'active' : ''} 
              onClick={() => setFilter('pendiente')}
            >
              Pendientes
            </button>
            <button 
              className={filter === 'completada' ? 'active' : ''} 
              onClick={() => setFilter('completada')}
            >
              Completadas
            </button>
          </div>

          {loading ? (
            <div className="loading">Cargando tareas...</div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>No hay tareas {filter !== 'all' ? filter + 's' : ''}</p>
            </div>
          ) : (
            <div className="todos-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;