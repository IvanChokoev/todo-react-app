import React, { useState } from 'react';

// Create a functional component named TodoForm that receives an 'addTodo' prop
const TodoForm = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState('');

    // Define a function named 'handleTodoAdd' that will 
    //add a new todo item when the 'Add' button is clicked
    const handleTodoAdd = () => {
        if (newTodo.trim() === '') return;
        addTodo(
            { id: Date.now(), text: newTodo, completed: false }
            );
        setNewTodo('');
    };

    return (
        <div className="TodoForm">
            <input
                type="text"
                placeholder="Add new todo"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
            />
            <button onClick={handleTodoAdd}>Add</button>
        </div>
    );
};

export default TodoForm;