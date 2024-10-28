// routes/todoRoutes.js
const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a to-do
router.post('/todos', async (req, res) => {  //todos this is rout/path
  const { title } = req.body;
  try {
    const newTodo = new Todo({
      title,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error creating todo' });
  }
});

// Get all to-dos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

// Update a to-do
router.put('/todos/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo' });
  }
});

// Delete a to-do
router.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

module.exports = router; //exporting
