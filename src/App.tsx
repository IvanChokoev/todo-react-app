import { useCallback } from 'react';
import './App.css';
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoProvider, useTodoContext } from './components/TodoContext'; // import the custom hook and the context

const App = () => {
  const { todos, setTodos, addTodo, toggleTodo } = useTodoContext();

  const handleTodoAdd = useCallback((text: string) => {
    addTodo(text);
  }, [addTodo]);

  const handleTodoDelete = useCallback((todoId: string) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }, [setTodos, todos]);

  const handleTodoComplete = useCallback((todoId: string) => {
    toggleTodo(todoId);
  }, [toggleTodo]);

  return (
    <TodoProvider>
      <div className="App">
        <h1>Todo List</h1>
        <TodoForm addTodo={handleTodoAdd} />
        <TodoList
          todos={todos} // Change 'todo' to 'todos'
          deleteTodo={handleTodoDelete}
          completeTodo={handleTodoComplete}
        />
      </div>
    </TodoProvider>
  );
};

export default App;