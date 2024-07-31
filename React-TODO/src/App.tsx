import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';

interface Task {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Add a new task to the list
  const addTask = (title: string, description: string) => {
    const newTask: Task = { id: tasks.length + 1, title, description };
    setTasks([...tasks, newTask]);
  };

  // Update an existing task
  const updateTask = (id: number, title: string, description: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title, description } : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = form.taskTitle.value.trim();
    const description = form.taskDescription.value.trim();

    if (title && description) {
      if (isEditing && currentTask) {
        updateTask(currentTask.id, title, description);
      } else {
        addTask(title, description);
      }
      form.reset();
    }
  };

  // Reset the form when the task is changed
  useEffect(() => {
    if (!isEditing) {
      setCurrentTask(null);
    }
  }, [isEditing]);

 

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
              value={currentTask?.title || ''}
              onChange={(e) => setCurrentTask(currentTask 
                ? { ...currentTask, title: e.target.value } 
                : { id: tasks.length + 1, title: e.target.value, description: '' })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label">Task Description</label>
            <textarea
              className="form-control"
              id="taskDescription"
              rows={3}
              required
              value={currentTask?.description || ''}
              onChange={(e) => setCurrentTask(currentTask 
                ? { ...currentTask, description: e.target.value } 
                : { id: tasks.length + 1, title: '', description: e.target.value })
              }
            ></textarea>
          </div>
          <button id="addTaskButton" type="submit" className="btn btn-primary">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
      {tasks.length > 0 && (
        <div className="todo-list">
          {tasks.map(task => (
            <Card
              key={task.id}
              task={task}
              onEdit={() => {
                setIsEditing(true);
                setCurrentTask(task);
              }}
              onDelete={() => setTasks(tasks.filter(t => t.id !== task.id))}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
