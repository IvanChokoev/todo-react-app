import React, { useMemo } from 'react';
import TodoItem from './TodoItem';
import { Todo, useTodoContext } from './TodoContext';
import { useQuery } from '@tanstack/react-query';
import db from '../firebase';

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (todoId: string) => void;
    completeTodo: (todoId: string) => void;
}

interface TodoItemProps {
    todo: Todo;
    completeTodo: (todoId: string) => void;
}

const TodoList = ({ deleteTodo }: TodoListProps): JSX.Element => {
    const { setTodos } = useTodoContext();

    // Define a fetch function to fetch the todos from Firebase
    const fetchTodos = async () => {
        const snapshot = await db.ref('todos').once('value');
        const todos = snapshot.val();
        const todoList: Todo[] = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id] } as Todo);
        }
        return todoList;
    };

    // Use the useQuery hook to fetch the todos and store them in the cache for future use
    const { data: todos, isLoading, isError } = useQuery(['todos'], fetchTodos);

    console.log('todolist check',todos);

    // useMemo is used to filter the todos array and return a new array containing only the incomplete todos.
    // optimize performance by reducing unnecessary re-renders
    const incompleteTodos = useMemo(() => {
        return todos?.filter((todo) => !todo.completed);
    }, [todos]);

    const completeTodo: TodoItemProps['completeTodo'] = (todoId) => {
        const todoRef = db.ref(`todos/${todoId}`);
        todoRef.update({
            completed: true,
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong.</div>;
    }

    return (
        <ul>
            {incompleteTodos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
            ))}
        </ul>
    );
};

export default TodoList;