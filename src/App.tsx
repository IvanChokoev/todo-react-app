import { useCallback } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoProvider, useTodoContext } from './components/TodoContext'; // import the custom hook and the context
import React, { useState } from 'react';

const App = () => {
  // Use the custom hook to access the todos, setTodos, addTodo, and toggleTodo functions from the context
  const { todos, setTodos, addTodo, toggleTodo } = useTodoContext();
  
  // Use useState to control whether the completed todos should be shown or hidden
  const [showCompleted, setShowCompleted] = useState(false);

  const handleTodoAdd = useCallback((text: string) => {
    addTodo(text);
  }, [addTodo]);

  const handleTodoDelete = useCallback((todoId: string) => {
    // Use setTodos to update the todos array by filtering out the todo with the specified ID
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }, [setTodos, todos]);

  const handleTodoComplete = useCallback((todoId: string) => {
    // Use toggleTodo to update the completed status of the todo with the specified ID
    toggleTodo(todoId);
  }, [toggleTodo]);

// Create a new array of completed todos by filtering the todos array
  const completedTodos = todos.filter((todo) => todo.completed);

// Render the TodoForm, TodoList, and completed todos list
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={handleTodoAdd} />
      <TodoList
        todos={todos} // Change 'todo' to 'todos'
        deleteTodo={handleTodoDelete}
        completeTodo={handleTodoComplete}
      />
      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Hide' : 'Show'} Completed Todos
      </button>
      {showCompleted && (
        <div>
          <h2>Completed Todos</h2>
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Wrap the App component with the TodoProvider component to provide access to the context
export default () => (
  <TodoProvider>
    <App />
  </TodoProvider>
);


