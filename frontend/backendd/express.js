const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

let tasks = []; //empty task array

app.get("/tasks",(req,res)=>{
  res.json(tasks);
});

app.post('/tasks',(req,res)=>{
    const {task} = req.body;

    if (task) {
        const newTask = {
            id: tasks.length + 1,  
            task: task,
            completed: false  
        };
        tasks.push(newTask); 
        res.status(201).json(newTask);  
        res.status(400).json({ error: 'Task content is required' }); 
    } 
});

app.delete('/tasks/:id', (req,res)=>{
    const taskId = parseInt(req.params.id);  
    const taskIndex = tasks.findIndex(t => t.id === taskId); 
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);  
        res.status(200).json({ message: 'Task deleted successfully' });
    }else{  
        res.status(404).json({ error: 'Task not found' });  
    }
});

const port =  3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});