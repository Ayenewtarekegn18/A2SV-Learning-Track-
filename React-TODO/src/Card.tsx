import React from 'react';

interface CardProps {
  task: {
    id: number;
    title: string;
    description: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <>
    <div className="card">
      <div className="card-body">
        <div className="card-info">
          <h5 className="card-title">{task.title}</h5>
          <p className="card-text">{task.description}</p>
        </div>
      </div>
    </div>
        <div className="card-actions">
          <button id = "editTaskButton" className="btn btn-primary" onClick={onEdit}>Edit</button>
          <button id = "deleteTaskButton" className="btn btn-danger" onClick={onDelete}>Delete</button>
        </div>
    </>
  );
}

export default Card;
