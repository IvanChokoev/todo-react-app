//Provider component

// useContext allows you to consume a context value
// from a parent component without the need 
// to pass down props to every level of child components

import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        setTodos([...todos, { text, completed: false }]);
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    return (
        <TodoContext.Provider value={{ todos, setTodos, addTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    return React.useContext(TodoContext);
};