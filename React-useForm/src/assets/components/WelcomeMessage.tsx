
import React from 'react';

interface WelcomeMessageProps {
  username: string;
  onClose: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({username, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h1>Welcome Back </h1>
        <h2> {username}</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default WelcomeMessage;
