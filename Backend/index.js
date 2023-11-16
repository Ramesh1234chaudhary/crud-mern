const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require("./db/user");
const LoginModel = require("./db/register")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 


app.use(express.json());
app.use(cookieParser()); 

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


mongoose.connect("mongodb://127.0.0.1:27017/employee");
 
 
  app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        LoginModel.create({ username, email, password: hash })
          .then((employees) => res.json("success"))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    LoginModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
              const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
                expiresIn: "1d",
              }); 
              res.cookie("authToken", token); 
              return res.json({Status:"success"});
            } else {
              return res.json("password is incorrect");
            }
          });
        } else {
          return res.json("no record existed");
        }
      });
  });  
  
  //for add task
  
  app.post("/add", (req, res) => {
    const task = req.body.task;
    UserModel.create({
      task: task,
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });
  

  app.get("/get",(req,res)=>{
    UserModel.find() 
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  })
  
  app.put("/update/:id",(req,res)=>{
    const {id} = req.params;
     
     UserModel.findByIdAndUpdate({_id: id},{done: true})
     .then(result=>res.json(result))
     .catch(err=>res.json(err))
  })

  app.put("/edit/:id",(req,res)=>{
    const { id } = req.params;
    const { task } = req.body; 
 
    UserModel.findByIdAndUpdate({_id: id}, { task: task })
    .then(result => res.json(result))
    .catch(err => res.json(err))
});


  app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;
    UserModel.findByIdAndDelete({_id: id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  })

app.listen(3001, () => {
  console.log("server is running");
});
