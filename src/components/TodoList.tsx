import React, { useEffect, useMemo } from 'react';
import TodoItem from './TodoItem';
import db from '../firebase';
import { Todo, useTodoContext } from './TodoContext';

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (todoId: string) => void;
    completeTodo: (todoId: string) => void;
}

const TodoList = ({ todos, deleteTodo, completeTodo }: TodoListProps): JSX.Element => {
    // extract todos array and setTodos function from the TodoContext
    const { todos: contextTodos, setTodos } = useTodoContext();

    // useMemo is used to filter the todos array and return a new array containing only the incomplete todos.
    // optimize performance by reducing unnecessary re-renders
    const incompleteTodos = useMemo(() => {
        return contextTodos.filter((todo) => !todo.completed);
    }, [contextTodos]);

    // useEffect to fetch data from an API
    useEffect(() => {
        const todosRef = db.ref('todos');
        todosRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList: Todo[] = []; // Specify the type of todoList as Todo[]
            for (let id in todos) {
                todoList.push({ id, ...todos[id] } as Todo); // Add a type assertion to tell TypeScript that the object is of type Todo
            }

            setTodos(todoList); // set the state of the TodoProvider with the fetched todoList
            console.log('Todo list updated:', todoList);
        });
    }, [setTodos]);

    console.log('todos:', todos);

    return (
        <ul>
            {incompleteTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;