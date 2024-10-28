import React, { useState, useEffect } from 'react';
import axios from 'axios'; // use to communicate with backend

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('/api/todos'); // Connect frontend and backend
        setTodos(res.data);
      } catch (err) {
        setError('Failed to connect to the backend. Please try again later.');
      } finally {
        setLoading(false); // Loading finished regardless of success or error
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;

    try {
      const res = await axios.post('/api/todos', { title });
      setTodos([...todos, res.data]);
      setTitle('');
      setError(''); // Clear error message on successful add
    } catch (err) {
      setError('Failed to add todo. Please try again.'); // Set error message on failure
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      setError(''); // Clear error message on successful delete
    } catch (err) {
      setError('Failed to delete todo. Please try again.'); // Set error message on failure
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      {loading ? ( // Show loading state
        <p className="text-center">Loading...</p>
      ) : error ? ( // Show error if any
        <p className="text-danger text-center">{error}</p>
      ) : (
        <>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new to-do"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-success" onClick={addTodo}>Add</button>
          </div>

          {todos.length === 0 ? ( // Check if there are no todos
            <p className="text-center">No todos available. Add your first todo!</p>
          ) : (
            <ul className="list-group">
              {todos.map(todo => (
                <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {todo.title}
                  <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
