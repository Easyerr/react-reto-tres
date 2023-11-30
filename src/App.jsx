import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './componentes/Header'
import Login from './componentes/Login'
import Register from './componentes/Register'
import Cajones from './componentes/Cajones'
import AñadirForm from './componentes/AñadirForm'
import GuestFooter from './componentes/Footer'
 
function App() {


  return (
    <>
      <BrowserRouter>
      <div>
        <Header />
      </div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cajones" element={<Cajones />}></Route> 
          <Route path="/añadir" element={<AñadirForm />}></Route> 
          <Route path="/footer" element={<GuestFooter/>}></Route> 
          
        </Routes>
        <div>
          <GuestFooter></GuestFooter>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App
