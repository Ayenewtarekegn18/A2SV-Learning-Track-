document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm') as HTMLFormElement;
    const taskTitleInput = document.getElementById('taskTitle') as HTMLInputElement;
    const taskDescriptionInput = document.getElementById('taskDescriptionInput') as HTMLInputElement;
    const todoList = document.getElementById('todo-list') as HTMLElement;
    const addTaskButton = document.getElementById('addTaskButton') as HTMLButtonElement;
    let currentTaskElement: HTMLElement | null = null;

    // Handle form submission to add or update a task
    taskForm.addEventListener('submit', function(event) {
        console.log()
        event.preventDefault();
        const taskTitle = taskTitleInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();

        if (taskTitle !== '' && taskDescription !== '') {
            if (currentTaskElement) {
                // Update the existing task
                (currentTaskElement.querySelector('.card-title') as HTMLElement).textContent = taskTitle;
                (currentTaskElement.querySelector('.card-text') as HTMLElement).textContent = taskDescription;
                currentTaskElement = null;
                addTaskButton.textContent = 'Add';
            } else {
                // Add a new task
                const taskCard = document.createElement('div');
                taskCard.className = 'card mb-3';
                taskCard.innerHTML = `
                    <div class="card-body">
                        <div class="texts"> 
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
                (taskCard.querySelector('.btn-edit') as HTMLElement).addEventListener('click', function() {
                    currentTaskElement = taskCard;
                    taskTitleInput.value = (taskCard.querySelector('.card-title') as HTMLElement).textContent || '';
                    taskDescriptionInput.value = (taskCard.querySelector('.card-text') as HTMLElement).textContent || '';
                    addTaskButton.textContent = 'Update';
                });

                (taskCard.querySelector('.btn-delete') as HTMLElement).addEventListener('click', function() {
                    todoList.removeChild(taskCard);
                });
            }

            // Clear the form inputs
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
        }
    });

    // Assuming these elements are defined somewhere in your HTML
    const closeModalButton = document.getElementById('closeModalButton') as HTMLElement;
    const editTaskButton = document.getElementById('editTaskButton') as HTMLElement;
    const deleteTaskButton = document.getElementById('deleteTaskButton') as HTMLElement;
    const taskModal = document.getElementById('taskModal') as HTMLElement;
    const modalTaskTitle = document.getElementById('modalTaskTitle') as HTMLInputElement;
    const modalTaskDescription = document.getElementById('modalTaskDescription') as HTMLInputElement;

    // Handle modal close button
    closeModalButton.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });

    // Handle edit task button in modal
    editTaskButton.addEventListener('click', function() {
        if (currentTaskElement) {
            const newTitle = modalTaskTitle.value;
            const newDescription = modalTaskDescription.value;
            (currentTaskElement.querySelector('.card-title') as HTMLElement).textContent = newTitle;
            (currentTaskElement.querySelector('.card-text') as HTMLElement).textContent = newDescription;
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