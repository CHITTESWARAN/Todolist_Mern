const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
app.use(cors())
const TodoModel=require("./Models/Todo")
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/todolist')

app.get("/",(req,res)=>{
TodoModel.find()
   .then((result)=>res.json(result))
   .catch((err)=>console.log(err)) 
})

app.post('/add',(req,res)=>{
 const task=req.body.task;
 TodoModel.create({
    task:task
 }).then(result => res.json(result))
 .catch((err)=>res.json(err));
})

app.delete('/delete/:id',(req,res)=>{
    const{id}=req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
 .catch((err)=>res.json(err));
})

app.put('/update/:id',(req,res)=>{
    const{id}=req.params;
    const{task}=req.body;
    TodoModel.findByIdAndUpdate({_id:id}, { task: task })
    .then(result=>res.json(result))
    .catch((err)=>res.json(err))
})
app.listen(8000,(err)=>{
    if(err)
    {
        console.log(err.message)
    }
    else{
        console.log(`Server is running the http://localhost:8000`)
    }
})