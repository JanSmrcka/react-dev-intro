import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: number) => {
      return todoApi.deleteTodo(id)
    },
    onMutate: (id) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return old?.filter((todo) => id !== todo.id)
      })
      return { previousTodos }
    },

    onSuccess: () => {
      // When i call todoDelete, the system refetches todos like 8 times. The refetch shloud occur just once. TODO: fix.
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },

    // TODO onError
  })
}
