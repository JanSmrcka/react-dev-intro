import { useContext } from 'react';
import { TodosContext } from '../context/todos.context';

export const UseTodoContext = () => {
    const context = useContext(TodosContext);
    if (context === undefined) {
        throw new Error('UseTodoContext must be used within a TodosProvider');
    }
    return context;
};