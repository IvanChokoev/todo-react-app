import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  const handleTodoAdd = newTodo => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoDelete = todoId => {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  };

  const handleTodoComplete = todoId => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

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