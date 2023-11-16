import React, { useState } from 'react'
import "./Register.css";
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
const Resigster = () => {
    
  const [username,setUsername]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()

  const navigate=useNavigate()

  const collection = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3001/register',{username,email,password})
      .then((result) => {
        navigate("/login")
         
        
        
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='signup_container'>
      <div className='signup_form'>
        <h2 style={{color:"black", paddingBottom:"9px",marginLeft:"130px"}}>Sign Up</h2>
        <form>
            <div >
                <label htmlFor='name' style={{color:"black"}}>Username:</label><br/>
                 <input type='name' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div> 
                <label htmlFor='email' style={{color:"black"}}>Email:</label><br/>
                 <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div> 
            <div>
                <label htmlFor='password' style={{color:"black"}}>Password:</label><br/>
                 <input type='password' placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div> 
             <button className='signup_btn' onClick={collection}>Sign up</button>
        </form>
        <br/>
         <p style={{color:"black"}}>Already have account?</p>
       <Link to="/login"><button className='form'>Login</button></Link>
      </div>
    </div>
  )
}

export default Resigster;
