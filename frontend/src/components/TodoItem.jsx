import { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, {
        title: editTitle,
        description: editDescription,
        status: todo.status
      });
      setIsEditing(false);
    }
  };

  const toggleStatus = () => {
    onUpdate(todo._id, {
      ...todo,
      status: todo.status === 'pendiente' ? 'completada' : 'pendiente'
    });
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Título"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Descripción"
          rows="2"
        />
        <div className="todo-actions">
          <button onClick={handleUpdate} className="btn-save">Guardar</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.status === 'completada' ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.status === 'completada'}
          onChange={toggleStatus}
        />
        <div className="todo-text">
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
          <small>{new Date(todo.createdAt).toLocaleDateString('es-ES')}</small>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">Editar</button>
        <button onClick={() => onDelete(todo._id)} className="btn-delete">Eliminar</button>
      </div>
    </div>
  );
};

export default TodoItem;