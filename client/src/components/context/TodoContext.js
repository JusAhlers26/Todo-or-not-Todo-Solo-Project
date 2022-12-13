import { createContext, useReducer } from 'react'

export const TodoContext = createContext()

export const TodoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODO':
      return {
        todos: action.payload
      }
    case 'CREATE_TODO':
      return {
        todos: [action.payload, ...state.todos]
      }
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: null
  })

  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}