import React, { useState } from 'react';
import db from '../firebase';

const TodoForm = () => {
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (text.trim () !== ''){
            const todoRef = db.ref('todos').push();
            todoRef.set({
                text,
                completed:false,
            });
            setText('');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
            type = "text"
            value = {text}
            onChange = { (event) => setText(event.target.value) }
            placeholder = "Enter a todo item" 
            />
<button type = "submit">Add</button>
        </form>
    )
}

export default TodoForm;