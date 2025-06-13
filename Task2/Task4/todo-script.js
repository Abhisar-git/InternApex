document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    todoList.addEventListener('click', function(event) {
        const target = event.target; 

   
        if (target.tagName === 'LI' || target.classList.contains('task-text')) {
            // Find the closest 'li' element (in case a child span was clicked)
            const listItem = target.closest('li');
            listItem.classList.toggle('completed'); 
            saveTasks(); 
        }

        // Check if a delete button was clicked
        if (target.classList.contains('delete-btn')) {
            target.closest('li').remove(); // Remove the parent list item
            saveTasks(); // Save updated state to Local Storage
        }
    });

   
    clearCompletedBtn.addEventListener('click', function() {
        const completedTasks = todoList.querySelectorAll('li.completed');
        completedTasks.forEach(task => task.remove()); 
        saveTasks(); // Save updated state to Local Storage
    });

    /**
    
     */
    function addTask() {
        const taskText = todoInput.value.trim(); 

        if (taskText === '') {
            alert('Please enter a task!'); 
            return;
        }

        
        createTaskElement(taskText, false); 
        todoInput.value = ''; 
        saveTasks(); 
    }

    /**
     
     * @param {string} text 
     * @param {boolean} isCompleted 
     */
    function createTaskElement(text, isCompleted) {
        const listItem = document.createElement('li'); 
        listItem.classList.add('todo-item'); 

        if (isCompleted) {
            listItem.classList.add('completed'); 
        }

        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task-text');
        taskSpan.textContent = text; 

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete'; 

        listItem.appendChild(taskSpan); 
        listItem.appendChild(deleteBtn); 
        todoList.appendChild(listItem); 
    }

    /**
 
     */
    function saveTasks() {
        const tasks = [];
       
        todoList.querySelectorAll('li').forEach(listItem => {
            tasks.push({
                text: listItem.querySelector('.task-text').textContent,
                completed: listItem.classList.contains('completed')
            });
        });
       
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    /**
     
     */
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('todos')); 
        if (tasks) {
            tasks.forEach(task => {
                createTaskElement(task.text, task.completed); 
            });
        }
    }
});