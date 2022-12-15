import { createContext, useReducer } from 'react'

export const TodosContext = createContext()

export const TodosReducer = (state, action) => {
  console.log('this spot here', action.payload)
  switch (action.type) {
    case 'SET_TODO':
      return { todos: action.payload }
    case 'CREATE_TODO':
      return { todos: [action.payload, ...state.todos] }
    case 'DELETE_TODO':
      return { todos: state.todos.filter((w) => w._id !== action.payload._id) }
    default:
      return state

  }
}

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodosReducer, {
    todos: null
  })

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}