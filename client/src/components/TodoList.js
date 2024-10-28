import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/todos`);
        console.log('Response from backend:', res.data);
        setTodos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to connect to the backend. Please check your connection or try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [API_BASE_URL]);

  const addTodo = () => {
    if (!title) return;
    axios.post(`${API_BASE_URL}/api/todos`, { title })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => setError('Failed to add todo. Please try again.'));
    setTitle('');
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_BASE_URL}/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => setError('Failed to delete todo. Please try again.'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>
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
      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.title}
            <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
