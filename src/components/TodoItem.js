
// This component renders a single todo item
const TodoItem = ({ todo, handleTodoDelete, handleTodoComplete }) => {

    // This function is called when the todo item is clicked
    const handleClick = () => {
        handleTodoComplete(todo.id); // call the parent component's function to complete the todo
    };

    // This function is called when the "Delete" button is clicked
    const handleDeleteClick = () => {
        handleTodoDelete(todo.id); // call the parent component's function to delete the todo
    };

    return (
        <li className={todo.completed ? 'completed' : ''}>
            <span onClick={handleClick}>{todo.text}</span>
            <button onClick={handleDeleteClick}>X</button>
        </li>
    );
};

export default TodoItem;