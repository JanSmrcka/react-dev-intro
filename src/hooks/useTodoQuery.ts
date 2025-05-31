import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useTodoQuery = (overrideId?: number) => {
  const params = useParams<{ id: string }>()
  const todoId = overrideId ?? Number(params.id)

  return useQuery<Todo, Error>({
    queryKey: ['todo', todoId],
    queryFn: () => todoApi.fetchTodo(todoId),
  })
}