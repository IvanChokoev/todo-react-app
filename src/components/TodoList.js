import React, {useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import db from '../firebase';

const TodoList = () => {
    const[todos, setTodos] = useState([]);

    useEffect(() => {
        const todosRef = db.ref('todos');
        todosRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
                todoList.push({ id, ...todos[id] });
            }
            setTodos(todoList);

            console.log('Todo list updated:', todoList);
        });
    }, []);

    console.log('todos:', todos);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;