import { useCallback, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo, TodoProvider, useTodoContext } from './components/TodoContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react';
import CompletedTodos from './components/CompletedTodos';
import { Provider } from 'react-redux';
import { store } from 'store';

// Create a new instance of the QueryClient
const queryClient = new QueryClient();

const App = () => {
  // Use the custom hook to access the todos, setTodos, addTodo, and toggleTodo functions from the context
  const { todos, setTodos, addTodo, toggleTodo } = useTodoContext();

  // Use useState to control whether the completed todos should be shown or hidden
  const [showCompleted, setShowCompleted] = useState(false);

  // function for adding a new todo with useCallback
  const handleTodoAdd = useCallback((text: string) => {
    addTodo(text);
  }, [addTodo]);

  // callback function for deleting a todo
  const handleTodoDelete = useCallback((todoId: string) => {
    // Use setTodos to update the todos array by filtering out the todo with the specified ID
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }, [setTodos, todos]);

  // callback function for completing a todo
  const handleTodoComplete = useCallback((todoId: string) => {
    // Use toggleTodo to update the completed status of the todo with the specified ID
    toggleTodo(todoId);
  }, [toggleTodo]);

// Create a new array of completed todos by filtering the todos array
  const completedTodos = todos.filter((todo) => todo.completed);

  // Render the TodoForm, TodoList, and completed todos list
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
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
        <CompletedTodos /> 
      </div>
    </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider >
  );
};

// Wrap the App component with the TodoProvider component to provide access to the context
export default () => (
  <TodoProvider>
    <App />
  </TodoProvider>
);