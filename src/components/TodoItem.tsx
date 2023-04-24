import React from 'react';
import { Todo } from './TodoContext';
import db from '../firebase';


//The completeTodo and deleteTodo functions are now being called in the handleToggle and handleDelete functions
//This will update the state of the TodoList component and trigger a re-render with the updated data.
interface TodoItemProps {
    todo: Todo;
    deleteTodo: (todoId: string) => void;
    completeTodo: (todoId: string) => void; // Add the completeTodo function to the props
}

interface Props {
    todo: {
        id: string,
        text: string,
        completed: boolean
    }
}

const TodoItem = ({ todo, deleteTodo, completeTodo }: TodoItemProps): JSX.Element => {

    // Remove the todo from Firebase
    const handleDelete = () => {
        const todoRef = db.ref(`todos/${todo.id}`);
        todoRef.remove();
        deleteTodo(todo.id); // Call the deleteTodo function from the props with the todo ID as an argument
    };

    // Update the "completed" field of the todo in Firebase
    const handleToggle = () => {
        const todoRef = db.ref(`todos/${todo.id}`);
        todoRef.update({
            completed: !todo.completed,
        });
        completeTodo(todo.id); // Call the completeTodo function from the props with the todo ID as an argument
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