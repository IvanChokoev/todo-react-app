import React from 'react';
import db from '../firebase';

const TodoItem = ({ todo }) => {
    const handleToggle = () => {
        const todoRef = db.ref(`todos/${todo.id}`);
        todoRef.update({
            completed: !todo.completed,
        });
    };

    const handleDelete = () => {
        const todoRef = db.ref(`todos/${todo.id}`);
        todoRef.remove();
    };

    return (
        <li className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
            <span>{todo.text}</span>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TodoItem;