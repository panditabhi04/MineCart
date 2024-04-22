import { useState } from 'react'
import './App.css'
import Singin from './components/SignIn'
import SingUp from './components/SingUp'
import ShowData from './components/ShowData'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopeingItems from './components/ShopeingItems'
import Admin from './components/Admin'
import Home from './components/Home'



function App() {

  return (
    
     <BrowserRouter>
        <Routes>
          
          <Route path="/Singin" element={<Singin />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/showdata" element={<ShowData />} />
          <Route path="/shopeingItems" element={<ShopeingItems />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />



          
        </Routes>
        </BrowserRouter>
   
    
    
  )
}

export default App
