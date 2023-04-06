import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {

    // Initialize todos as an empty array using useState
  const [todos, setTodos] = useState([]);

    // Handler function to add a new todo
  const handleTodoAdd = newTodo => {
    setTodos([...todos, newTodo]);
  };

    // Handler function to delete a todo
  const handleTodoDelete = todoId => {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  };

    // Handler function to complete a todo
  const handleTodoComplete = todoId => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

    // Render the App component with TodoForm and TodoList components
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={handleTodoAdd} />
      <TodoList
        todos={todos}
        deleteTodo={handleTodoDelete}
        completeTodo={handleTodoComplete}
      />
    </div>
  );
};

export default App;