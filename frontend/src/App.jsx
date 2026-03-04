import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SingUp from './pages/SingUp'
import { ToastContainer, toast, Flip, Bounce, Zoom } from 'react-toastify';


function App() {


  return (
  <BrowserRouter>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Flip}
/>
  <Routes>
    <Route path="/" element={<div>home</div>} ></Route>
    <Route path="/register" element={<SingUp/>} ></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
