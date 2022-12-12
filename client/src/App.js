import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Todo from './components/todolist'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Todo />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;