const Todo = require('../models/todo.model')
const mongoose = require('mongoose')

// get all Todo Tasks
const getAllTodos = async (req, res) => {
  const user_id = req.user._id

  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 })

  res.json(todos)
}

// get a single Todo Task
const getTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'No such Task' })
  }

  const todo = await Todo.findById(id)

  if (!todo) {
    return res.json({ error: 'No such Task' })
  }

  res.json(todo)
}


// create new Todo Task
const createTodo = async (req, res) => {
  const { title, load, reps } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('date')
  }
  if (!reps) {
    emptyFields.push('description')
  }
  if (emptyFields.length > 0) {
    return res.json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add to db
  try {
    const user_id = req.user._id
    const todo = await Todo.create({ title, date, description, user_id })
    res.json(todo)
  } catch (error) {
    res.json({ error: error.message })
  }
}

// delete a Todo Task
const deleteTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'No such todo' })
  }

  const todo = await Todo.findOneAndDelete({ _id: id })

  if (!todo) {
    return res.json({ error: 'No such todo' })
  }

  res.json(todo)
}

// update a Todo Task
const updateTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'No such Task' })
  }

  const todo = await Todo.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!todo) {
    return res.json({ error: 'No such Task' })
  }

  res.json(todo)
}


module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo
}