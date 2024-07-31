import React, { useState } from 'react';
import './App.css';
import Card from './Card';

// Define the Task interface with id, title, and description properties
interface Task {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to manage whether a task is being edited
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // State to manage the current task being edited
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Function to add a new task to the list
  const addTask = (title: string, description: string) => {
    console.log(title, description); // Log the title and description to the console
    const newTask: Task = { id: tasks.length + 1, title, description }; // Create a new task object
    setTasks([...tasks, newTask]); // Update the tasks state with the new task
  };

  // Function to update an existing task in the list
  const updateTask = (id: number, title: string, description: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, title, description } : task // Update the task if the id matches
    );
    setTasks(updatedTasks); // Update the tasks state with the updated tasks
    resetForm(); // Reset the form after updating
  };

  // Function to reset the form (clear current task and editing state)
  const resetForm = () => {
    setCurrentTask(null); // Clear the current task
    setIsEditing(false); // Set editing state to false
  };

  // Function to handle the edit action
  const handleEdit = (task: Task) => {
    setCurrentTask(task); // Set the current task to the task being edited
    setIsEditing(true); // Set editing state to true
  };

  // Function to handle the delete action
  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id); // Filter out the task with the given id
    setTasks(updatedTasks); // Update the tasks state with the remaining tasks
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const form = e.target as HTMLFormElement;
    const title = form.taskTitle.value.trim(); // Get the trimmed title value from the form
    const description = form.taskDescription.value.trim(); // Get the trimmed description value from the form

    if (title && description) {
      if (isEditing && currentTask) {
        updateTask(currentTask.id, title, description); // Update the task if editing
      } else {
        addTask(title, description); // Add a new task if not editing
      }

      form.reset(); // Reset the form fields
      resetForm(); // Reset the form state
    } else {
      console.error("Both title and description are required."); // Log an error if title or description is missing
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">TODO <span className="title-list">LIST</span></h1>
        <form id="taskForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              required
              defaultValue={currentTask?.title || ''} // Set the default value to the current task's title if editing
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label">Task Description</label>
            <textarea
              className="form-control"
              id="taskDescription"
              rows={3}
              required
              defaultValue={currentTask?.description || ''} // Set the default value to the current task's description if editing
            ></textarea>I 
          </div>
          <button id="addTaskButton" type="submit" className="btn btn-primary">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
      {tasks.length === 0 ? (
        <p></p> // Display a message if there are no tasks
      ) : (
        <div className="todo-list">
          {tasks.map(task => (
            <Card
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task)} // Pass the handleEdit function to the Card component
              onDelete={() => handleDelete(task.id)} // Pass the handleDelete function to the Card component
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;