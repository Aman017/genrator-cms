import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SingUp from './pages/SingUp'


function App() {


  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<div>home</div>} ></Route>
    <Route path="/register" element={<SingUp/>} ></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
