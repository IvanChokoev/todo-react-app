import React from 'react';
import db from '../firebase';

interface Props {
    todo: {
        id: string,
        text: string,
        completed: boolean
    }
}

const TodoItem: React.FC<Props> = ({ todo }) => {
    // Update the "completed" field of the todo in Firebase
    const handleToggle = () => {
        const todoRef = db.ref(`todos/${todo.id}`);
        todoRef.update({
            completed: !todo.completed,
        });
    };

    // Remove the todo from Firebase
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