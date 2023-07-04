import { createStore } from 'redux';

// Define the initial state of the completed todos
interface CompletedTodosState {
    count: number;
}

const initialState: CompletedTodosState = {
    count: 0,
};

// Define the action types and creators for updating the completed todos state
enum ActionType {
    INCREMENT_COMPLETED_TODOS = 'INCREMENT_COMPLETED_TODOS',
    DECREMENT_COMPLETED_TODOS = 'DECREMENT_COMPLETED_TODOS',
}

interface IncrementCompletedTodosAction {
    type: ActionType.INCREMENT_COMPLETED_TODOS;
}

interface DecrementCompletedTodosAction {
    type: ActionType.DECREMENT_COMPLETED_TODOS;
}

type CompletedTodosAction = IncrementCompletedTodosAction | DecrementCompletedTodosAction;

function incrementCompletedTodos(): IncrementCompletedTodosAction {
    return {
        type: ActionType.INCREMENT_COMPLETED_TODOS,
    };
}

function decrementCompletedTodos(): DecrementCompletedTodosAction {
    return {
        type: ActionType.DECREMENT_COMPLETED_TODOS,
    };
}

// Define the reducer for updating the completed todos state
function completedTodosReducer(state = initialState, action: CompletedTodosAction): CompletedTodosState {
    switch (action.type) {
        case ActionType.INCREMENT_COMPLETED_TODOS:
            return {
                count: state.count + 1,
            };
        case ActionType.DECREMENT_COMPLETED_TODOS:
            return {
                count: state.count - 1,
            };
        default:
            return state;
    }
}

// Create a Redux store with the completed todos reducer
const store = createStore(completedTodosReducer);

export { store, incrementCompletedTodos, decrementCompletedTodos };