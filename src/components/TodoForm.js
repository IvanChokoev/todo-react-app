import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState('');

    const handleTodoAdd = () => {
        if (newTodo.trim() === '') return;
        addTodo({ id: Date.now(), text: newTodo, completed: false });
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