//Provider component
//creates a centralized location for storing and manipulating Todo data which can be easily accessed and updated by any component in the app.

// useContext allows you to consume a context value from a parent component without the need to pass down props to every level of child components
import React, { createContext, useState, useContext, ReactNode, FC } from 'react';

// Define the shape of a todo item
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}
// Define the props that will be provided by the TodoContext
interface TodoContextProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
}

// Create a new context that will store the todo items
export const TodoContext = createContext<TodoContextProps>({
    todos: [],
    setTodos: () => { },
    addTodo: () => { },
    toggleTodo: () => { },
});

// Define the props for the TodoProvider component
interface TodoProviderProps {
    children: ReactNode;
}

// Create a new component that provides the TodoContext to its children
export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
// Use the useState hook to create a new state variable for the todo items
    const [todos, setTodos] = useState<Todo[]>([]);

// Create a function to add a new todo item to the state variable
    const addTodo = (text: string) => {
        setTodos([...todos, { id: Math.random().toString(), text, completed: false }]);
    };

    // Create a function to toggle the completed status of a todo item in the state variable
    const toggleTodo = (id: string) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
            setTodos(newTodos);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, setTodos, addTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

// Define a custom hook to access the TodoContext
export const useTodoContext = () => {
    return useContext(TodoContext);
};