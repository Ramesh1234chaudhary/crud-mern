import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";





import "./Home.css"
import axios from "axios";
import { BsCircleFill,BsCheckCircleFill } from "react-icons/bs";

const Home = () => {
    const [todo,setTodo]=useState([]);
    const [selected,setEditedTask]=useState("")
    const [editedid,setEditedId]=useState("")
    const [task,setTask]=useState()
    const [edit,setEdit]=useState(true);

    useEffect(() => {
    
      axios.get('http://localhost:3001/get')
        .then((result) => setTodo(result.data))
        .catch((err) => console.log(err));
    },);

    const handleEdited = (id, task) => {
    
      setEditedTask(task);
      setEditedId(id);
      console.log(selected)
      setEdit(false)
      setTask(task) 
    };
   
    
   
    const edithandle = () => {
      
      if (!task) {
        console.log("Task cannot be empty");
        return;
      } 
    
      axios
        .put(`http://localhost:3001/edit/${editedid}`, { task: task }) 
        .then((result) => {
          
          setTodo((prevTodo) => {
            return prevTodo.map((item) =>
              item._id === editedid ? { ...item, task: task } : item
            );
          });
          console.log(result);
      
          setEdit(true); 
          setTask(""); 
        })
        .catch((err) => console.log(err));
    };
  
      
    

  
    const handleCompleted = (id) => {
      axios
        .put('http://localhost:3001/update/' + id)
        .then((result) => {
        
          setTodo((prevTodo) => {
            return prevTodo.map((item) =>
              item._id === id ? { ...item, done: !item.done } : item
            );
          });
          console.log(result);
        })
        .catch((err) => console.log(err));
    };
  
    const handleDelete = (id) => {
      axios
        .delete('http://localhost:3001/delete/' + id)
        .then((result) => {
        
          setTodo((prevTodo) => prevTodo.filter((item) => item._id !== id));
          console.log(result);
        })
        .catch((err) => console.log(err));
    };
    
    const handleadd=()=>{
     axios.post("http://localhost:3001/add",{task:task})
     .then(result=>console.log(result))
      .catch(err=>console.log(err)) 
     setTask("")
    }
  return (
    <div className='home'>
       
       <div className='create'>
        <h2  style={{color:"black"}}>Todo List</h2>
       <div className='create-form'>
      <input type='text' placeholder='Enter Task'  value={task} onChange={(e)=>setTask(e.target.value)}/>
    { edit ? <button onClick={handleadd}>Add</button>:
      <button onClick={edithandle}>Edit</button>}
    </div>
  

         {
            todo.length === 0 ?
           <div> <h4 style={{color:"red"}}>No Record</h4> </div>:
          todo.map(ele=>{
         return <div className='task'>
          <div className='checkbox'  onClick={()=>handleCompleted(ele._id)}>
            {
              ele.done ? <BsCheckCircleFill className='icon'></BsCheckCircleFill>:<BsCircleFill className="icon"/>
            }
            <p className={ele.done ? "line":" "}>{ele.task}</p>
             
        </div>
           
          <div className="icon" > <CiEdit onClick={()=>handleEdited(ele._id, ele.task)}
           style={{backgroundColor:"greeb"}} ></CiEdit> </div>
          <div className="icon" > <BsFillTrashFill onClick={()=>handleDelete(ele._id)}
            ></BsFillTrashFill> </div>
          
          </div> 
          })  
         }
         </div>
    </div>
  )
}  

export default Home;
