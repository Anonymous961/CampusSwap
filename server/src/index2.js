require("dotenv").config()
const express=require("express");
const cors=require("cors");
const morgan=require("morgan")
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes")
const pool=require("./sql_database/db")

const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'))

app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next();
})

const PORT=process.env.PORT | 5000;

app.get("/",()=>{
    console.log("working")
})
//create a todo
app.post("/todos",async(req,res)=>{
    try{
        const {description}=req.body;
        const newTodo= await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message)
    }
})
//get all todos
app.get("/todos",async (req,res)=>{
    try {
        const allTodos= await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(err.message)
    }
})
//get a todo
app.get("/todos/:id",async (req,res)=>{
    const {id}=req.params;
    try {
        const todo= await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(err.message)
    }
})
app.listen(PORT,()=>{
    console.log("Server running on PORT "+PORT)
})