document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Event listener for "Add Task" button click
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for "Enter" key press in the input field
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for clicks on the todoList (delegation)
    todoList.addEventListener('click', function(event) {
        const target = event.target; // The specific element that was clicked

        // Check if a list item (or its child text) was clicked to toggle completion
        if (target.tagName === 'LI' || target.classList.contains('task-text')) {
            // Find the closest 'li' element (in case a child span was clicked)
            const listItem = target.closest('li');
            listItem.classList.toggle('completed'); // Add/remove 'completed' class
            saveTasks(); // Save updated state to Local Storage
        }

        // Check if a delete button was clicked
        if (target.classList.contains('delete-btn')) {
            target.closest('li').remove(); // Remove the parent list item
            saveTasks(); // Save updated state to Local Storage
        }
    });

    // Event listener for "Clear Completed" button click
    clearCompletedBtn.addEventListener('click', function() {
        const completedTasks = todoList.querySelectorAll('li.completed'); // Select all completed tasks
        completedTasks.forEach(task => task.remove()); // Remove each completed task
        saveTasks(); // Save updated state to Local Storage
    });

    /**
     * Adds a new task to the list based on the input field's value.
     */
    function addTask() {
        const taskText = todoInput.value.trim(); // Get input value and remove whitespace

        if (taskText === '') {
            alert('Please enter a task!'); // Alert if input is empty
            return; // Stop function execution
        }

        // Create and append the new task element
        createTaskElement(taskText, false); // 'false' because new tasks are not completed
        todoInput.value = ''; // Clear the input field
        saveTasks(); // Save the new task to Local Storage
    }

    /**
     * Creates and appends a new list item (task) to the UL.
     * @param {string} text - The text content of the task.
     * @param {boolean} isCompleted - Whether the task is initially completed.
     */
    function createTaskElement(text, isCompleted) {
        const listItem = document.createElement('li'); // Create a new LI element
        listItem.classList.add('todo-item'); // Add a class for styling

        if (isCompleted) {
            listItem.classList.add('completed'); // Add 'completed' class if necessary
        }

        const taskSpan = document.createElement('span');
        taskSpan.classList.add('task-text');
        taskSpan.textContent = text; // Set the text content

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete'; // Set button text

        listItem.appendChild(taskSpan); // Add the text span to the LI
        listItem.appendChild(deleteBtn); // Add the delete button to the LI
        todoList.appendChild(listItem); // Add the LI to the UL
    }

    /**
     * Saves the current state of all tasks to Local Storage.
     */
    function saveTasks() {
        const tasks = [];
        // Iterate over all list items and collect their text and completed status
        todoList.querySelectorAll('li').forEach(listItem => {
            tasks.push({
                text: listItem.querySelector('.task-text').textContent,
                completed: listItem.classList.contains('completed')
            });
        });
        // Store the array of task objects as a JSON string
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    /**
     * Loads tasks from Local Storage and renders them on the page.
     */
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('todos')); // Retrieve and parse stored tasks
        if (tasks) {
            tasks.forEach(task => {
                createTaskElement(task.text, task.completed); // Create element for each loaded task
            });
        }
    }
});