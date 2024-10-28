import React, { useState, useEffect } from 'react';
import axios from 'axios'; //use comunicate with backend

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('/api/todos')     //frontent and backend connected here and /api is a rout/path and  acces it
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = () => {
    if (!title) return;
    axios.post('/api/todos', { title })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error(err));
    setTitle('');
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.error(err));
  };

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
