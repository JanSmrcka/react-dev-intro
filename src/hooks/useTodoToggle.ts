import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import type { Todo, TodoToggle } from '../types'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['toggleTodo'],
    mutationFn: async (todoToggle: TodoToggle) => {
      return todoApi.toggleTodo(todoToggle)
    },

    onMutate: async (todoToggle) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return old?.map((todo) => (todo.id === todoToggle.id ? { ...todo, completed: todoToggle.completed } : todo))
      })
      return { previousTodos }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
