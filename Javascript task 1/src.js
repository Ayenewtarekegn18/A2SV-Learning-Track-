document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescriptionInput');
    const todoList = document.getElementById('todo-list');
    const addTaskButton = document.getElementById('addTaskButton');
    let currentTaskElement = null;

    // Handle form submission to add or update a task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskTitle = taskTitleInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();

        if (taskTitle !== '' && taskDescription !== '') {
            if (currentTaskElement) {
                // Update the existing task
                currentTaskElement.querySelector('.card-title').textContent = taskTitle;
                currentTaskElement.querySelector('.card-text').textContent = taskDescription;
                currentTaskElement = null;
                addTaskButton.textContent = 'Add';
            } else {
                // Add a new task
                const taskCard = document.createElement('div');
                taskCard.className = 'card mb-3';
                taskCard.innerHTML = `
                    <div class="card-body">
                        <div class = "texts"> 
                        <h5 class="card-title">${taskTitle}</h5>
                        <p class="card-text">${taskDescription}</p>
                        </div>
                        <div class="buttons">
                        <button class="btn btn-primary btn-edit">Edit</button>
                        <button class="btn btn-danger btn-delete">Delete</button>
                        </div>
                    </div>
                `;
                todoList.appendChild(taskCard);

                // Add event listeners to the new buttons
                taskCard.querySelector('.btn-edit').addEventListener('click', function() {
                    currentTaskElement = taskCard;
                    taskTitleInput.value = taskCard.querySelector('.card-title').textContent;
                    taskDescriptionInput.value = taskCard.querySelector('.card-text').textContent;
                    addTaskButton.textContent = 'Update';
                });

                taskCard.querySelector('.btn-delete').addEventListener('click', function() {
                    todoList.removeChild(taskCard);
                });
            }

            // Clear the form inputs
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
        }
    });

    // Handle modal close button
    closeModalButton.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });

    // Handle edit task button in modal
    editTaskButton.addEventListener('click', function() {
        if (currentTaskElement) {
            const newTitle = modalTaskTitle.textContent;
            const newDescription = modalTaskDescription.textContent;
            currentTaskElement.querySelector('.card-title').textContent = newTitle;
            currentTaskElement.querySelector('.card-text').textContent = newDescription;
            taskModal.style.display = 'none';
        }
    });

    // Handle delete task button in modal
    deleteTaskButton.addEventListener('click', function() {
        if (currentTaskElement) {
            todoList.removeChild(currentTaskElement);
            taskModal.style.display = 'none';
        }
    });
});