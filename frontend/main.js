const API_URL = 'http://localhost:3001/tasks'; 

document.addEventListener('DOMContentLoaded',()=>{
    loadTasks();
    document.querySelector('.add-task button').addEventListener('click', addTask);

    document.querySelector('.add-task input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

async function loadTasks(){
    try{
        const response = await fetch(API_URL);
        const tasks = await response.json();

        const todoList= document.getElementById('todo-list');
        todoList.innerHTML='';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task');
            li.innerHTML = `
                <h6>${task.task}</h6>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            `;

            li.querySelector('.complete-btn').addEventListener('click', () => markComplete(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

            todoList.appendChild(li);  
        });
     }catch(error){
        console.error('Error loading tasks:', error)
     }
    }

    async function addTask() {
        const taskInput= document.querySelector('.add-task input');
        const task = taskInput.value.trim();

        if (task) {
            try {
                const newTask = { task, completed: false };  
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                });
    
                if (response.ok) {
                    taskInput.value = '';  
                    loadTasks();  
                } else {
                    console.error('Error adding task');
                }
            } catch (error) {
                console.error('Error adding task:', error);  
            }
        } else {
            alert('Please enter a task');  
        }
    }

    async function deleteTask(taskId) {
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                loadTasks();  
            } else {
                console.error('Error deleting task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);  
    }
}
