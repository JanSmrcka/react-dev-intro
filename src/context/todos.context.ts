import type {Todo} from '../types.ts';
import { createContext } from 'react'

type TodosContext = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (todoValue: string) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
  toggleTodo: (todoId: number, todoState: boolean) => Promise<void>;
  refetch: () => Promise<void>;
}

export const TodosContext = createContext<TodosContext | undefined>(undefined);
