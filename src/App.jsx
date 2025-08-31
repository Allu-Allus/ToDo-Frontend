
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ToDo from './pages/ToDo'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ToDo/>}/>
      </Routes>
    </>
  )
}

export default App
