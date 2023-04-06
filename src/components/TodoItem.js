import React from 'react';

// todo prop -> contains information about the todo item to be displayed.
// deleteTodo prop -> removes a todo item from the list when called.
// completeTodo prop -> marks a todo item as complete when called.

// This function marks a todo item as complete by calling the completeTodo prop with the todo item's id.
const TodoItem = ({ todo, deleteTodo, completeTodo }) => {
    const handleTodoComplete = () => {
        completeTodo(todo.id);
    };

    // This function removes a todo item by calling the deleteTodo prop with the todo item's id.
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