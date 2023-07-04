import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './TodoContext';
import { store } from 'store';


const CompletedTodos = () => {
    const completedTodos = useSelector((state: RootState) => state.completedTodos);

    // Add a check to make sure that completedTodos is defined
    if (!completedTodos) {
        return null;
    }

    return (
        <div>
            Completed Todo Count: {completedTodos.count}
        </div>
    );
};
export default CompletedTodos;