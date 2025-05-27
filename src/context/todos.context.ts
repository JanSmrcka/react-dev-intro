import React from 'react';
import type { Todo } from '../types';

type TodosContext = {
    todos: Todo[];
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
    addTodo: (todoName: string) => Promise<void>;
    toggleTodo: (todoId: number, completed: boolean) => Promise<void>;
    removeTodo: (todoId: number) => Promise<void>;
    fetchTodos: () => Promise<void>;
};

export const TodosContext = React.createContext<TodosContext | undefined>(undefined);