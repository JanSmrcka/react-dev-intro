import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoToggle } from '../types'
import { showToast } from '../helpers/toast.notification.helper.ts'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, TodoToggle>({
    mutationKey: ['toggleTodo'],
    mutationFn: async (todoToggle: TodoToggle) => {
      // Do optimistic update here
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      if (previousTodos) {
        const updatedTodos = previousTodos.map(todo =>
          todo.id === todoToggle.id ? { ...todo, completed: !todo.completed } : todo
        );
        queryClient.setQueryData(['todos'], updatedTodos);
      }
      
      return await todoApi.toggleTodo(todoToggle)
    },
    onSuccess: () => {
      showToast("Todo toggled successfully", 'success');
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      showToast(`Error toggling todo: ${error.message}`, 'error');
    },
  })
}
