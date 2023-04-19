import React, { useState, useCallback } from 'react';
import db from '../firebase';

// keep track of the text that the user enters into the input field
// The current value of text is passed to the input field's value prop, 
// and the onChange handler updates the state value whenever the user types or deletes text in the input field.

// Define the props interface for the TodoForm component
interface TodoFormProps {
    addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = () => {
    // Define state to keep track of the user's input text
    const [text, setText] = useState<string>('');

    // Define a memoized handleSubmit function using useCallback
    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Check if the user's input text is not empty
            if (text.trim() !== '') {
                // Push the new todo item to the Firebase database
                const todoRef = db.ref('todos').push();
                todoRef.set({
                    text,
                    completed: false,
                });

                // Clear the input field by resetting the text state
                setText('');
            }
        },
        // Include the text state variable in the dependency array
        [text]
    );

    // Log the user's input text whenever it changes
    console.log('New todo added:', text);

    // Render a form with an input field and a submit button
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