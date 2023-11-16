import React from 'react'
import "./App.css"
import Navbar from './Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Resigster from './Resigster';
import Login from './Login';
import Home from './Home';
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Resigster/>}/>
        <Route path="/login" element={<Login/>}/>
       


           </Routes> 
    </BrowserRouter>
  )
}

export default App;
