import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import { showToast, showUndoToast } from '../helpers/toast.notification.helper.tsx'
import type { Todo } from '../types.ts'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: number) => {
      // Request a todo from the cache
      
      // Do optimistic update here
      const allTodos: Todo[] = queryClient.getQueryData(['todos']) || [];
      if (allTodos) {
        const deletedTodo = (allTodos.find(todo => todo.id === id)) as Todo;

        // Undo functionality
        showUndoToast(deletedTodo, (todo: Todo) => {
          const previousTodos: Todo[] = queryClient.getQueryData(['todos']) || [];
          if (previousTodos) {
            const newTodo = {
              id: Date.now(),
              name: todo.name,
              priority: todo.priority,
              description: todo.description,
              completed: todo.completed,
            }
            queryClient.setQueryData(['todos'], [...previousTodos, newTodo])
          }

          todoApi.createTodo(todo.name, todo.priority, todo.description);
        });
        
        const filteredTodos = allTodos.filter(todo => todo.id !== id);
        queryClient.setQueryData(['todos'], [...filteredTodos])
      }
      
      return await todoApi.deleteTodo(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      showToast(`Error deleting todo: ${error.message}`, 'error');
    },
  })
}
