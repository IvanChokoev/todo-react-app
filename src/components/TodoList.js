import React, { useEffect, useMemo } from 'react';
import TodoItem from './TodoItem';
import db from '../firebase';
import { useTodoContext } from './TodoContext';


const TodoList = () => {
    const { todos, setTodos } = useTodoContext();

    //useMemo is used to filter the todos array and return a new array containing only the incomplete todos.
    //optimize performance by reducing unnecessary re-renders
    const memorizedTodos = useMemo(() => {
        return todos.filter(todo => !todo.completed);
    }, [todos]);

    // useeffect to fetch data from an API
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
    }, [setTodos]);

    console.log('todos:', todos);

    return (
        <ul>
            {memorizedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;