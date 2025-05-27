import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Todo } from '../types/types';
import { todoService } from '../api/todoApi.ts'

interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],

      fetchTodos: async () => {
        try {
          const todos = await todoService.fetchTodos();
          set({ todos });
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
      },

      addTodo: async (text: string) => {
        try {
          const newTodo = await todoService.createTodo(text);
          set((state) => ({ todos: [...state.todos, newTodo] }));
        } catch (error) {
          console.error('Failed to add todo:', error);
        }
      },

      toggleTodo: async (id: number) => {
        const todo = get().todos.find((t) => t.id === id);
        if (!todo) return;

        try {
          const updated = await todoService.toggleCompletion(id, !todo.completed);
          set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? updated : t)),
          }));
        } catch (error) {
          console.error('Failed to toggle todo:', error);
        }
      },

      deleteTodo: async (id: number) => {
        try {
          await todoService.deleteTodo(id);
          set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
          }));
        } catch (error) {
          console.error('Failed to delete todo:', error);
        }
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
