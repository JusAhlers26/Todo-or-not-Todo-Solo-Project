const express = require('express')
const {
  createTodo,
  getAllTodos,
  getTodo,
  deleteTodo,
  updateTodo
} = require('../controllers/todo.controller')

const requireAuth = require('../authorization/authorization')

const router = express.Router()

router.use(requireAuth)

// GET all todo tasks
router.get('/', getAllTodos)

// Get a todo
router.get('/:id', getTodo)

// POST a new todo
router.post('/', createTodo)

// DELETE a todo
router.delete('/:id', deleteTodo)

// UPDATE a todo
router.patch('/:id', updateTodo)


module.exports = router