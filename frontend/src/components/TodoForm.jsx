import { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      status: 'pendiente'
    });

    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>Nueva Tarea</h2>
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="text"
        placeholder="Título de la tarea *"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError('');
        }}
      />
      
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />
      
      <button type="submit" className="btn-add">Agregar Tarea</button>
    </form>
  );
};

export default TodoForm;