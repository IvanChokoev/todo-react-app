import React from 'react';

const TodoItem = ({ todo, deleteTodo, completeTodo }) => {
    const handleTodoComplete = () => {
        completeTodo(todo.id);
    };

    const handleTodoDelete = () => {
        deleteTodo(todo.id);
    };

    return (
        <li className={todo.completed ? 'completed' : ''}>
            <span onClick={handleTodoComplete}>{todo.text}</span>
            <button onClick={handleTodoDelete}>X</button>
        </li>
    );
};

export default TodoItem;