import React, { useState, useCallback } from 'react';
import db from '../firebase';

// keep track of the text that the user enters into the input field
// The current value of text is passed to the input field's value prop, 
// and the onChange handler updates the state value whenever the user types or deletes text in the input field.

const TodoForm = () => {
    const [text, setText] = useState('');

    //wrap the handleSubmit func in a useCallback and passing 'text' as a dependency
    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        if (text.trim() !== '') {
            const todoRef = db.ref('todos').push();
            todoRef.set({
                text,
                completed: false,
            });
            setText('');
        }
    }, [text]);

    console.log('New todo added:', text);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Enter a todo item"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;