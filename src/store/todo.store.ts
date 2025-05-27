import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Todo } from '../types/types';

interface TodoState {
  todos: Todo[];
  //initialize: () => void, 
  addTodo: (text: string) => void;
  toggleTodo: (id: number | null) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text: string) => {
        const now = new Date();
        const newTodo: Todo = {
          id: null,
          text,
          completed: false,
          createdAt: now,
          updatedAt: now,
        };
        
        // TODO: Send request to the server
        
        // Set the todo to the state.
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date(),
              }
              : todo
          ),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
