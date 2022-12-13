import { useState } from "react"
import { useTodosContext } from "../components/hooks/useTodosContext"
import { useAuthContext } from '../components/hooks/useAuthContext'

const TodoForm = () => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const todo = { title, date, description }

    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setDate('')
      setDescription('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_TODO', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Todo</h3>

      <label>Todo Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Date:</label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label>Description:</label>
      <input
        type="textarea"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <button>Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TodoForm