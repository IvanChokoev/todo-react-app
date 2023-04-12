import { useContext } from 'react';
import { TodosContext } from './TodosContext';

// custom hook called useTodos that 
// returns the todos array, addTodo function, 
// and removeTodo function from the TodosContext
export const useTodos = () => {
    const { todos, addTodo, removeTodo } = useContext(TodosContext);
    return { todos, addTodo, removeTodo };
};