import React from 'react'
import "./Register.css";
import {Link} from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {

 
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate = useNavigate();

  const collection = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3001/login',{email,password})
      .then((result) => {
        if(result.data.Status === "success"){
          navigate("/")
        }else{
           alert("password does not match")
        }
        
        
        
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div className='signup_container'>
    <div className='signup_form'>
      <h2 style={{color:"black", paddingBottom:"9px",marginLeft:"130px"}}>Login</h2>
      <form action=''>
          
      <div> 
                <label htmlFor='email' style={{color:"black"}}>Email:</label><br/>
                 <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div> 
            <div>
                <label htmlFor='password' style={{color:"black"}}>Password:</label><br/>
                 <input type='password' placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div> 
             <button className='signup_btn' onClick={collection}>Login</button>
          </form>
      <br/>
       <p style={{color:"black"}}>Not Registerd?</p>
       <Link to="/register"><button className='form'>Sign up</button></Link>

    </div>
  </div>

  )
}

export default Login
