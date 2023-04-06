import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
    return (
        <ul className="TodoList">
            {todos.map(todo => (
                
                // For each todo, we pass the following props to the `TodoItem` component:
                // - `key` is a unique identifier for React to keep track of each item.
                // - `todo` is the todo object itself.
                // - `deleteTodo` is the `deleteTodo` function passed as a prop to this component.
                // - `completeTodo` is the `completeTodo` function passed as a prop to this component.

                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                />
            ))}
        </ul>
    );
};

export default TodoList;