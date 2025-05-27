import { useQuery } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'
import { useParams } from 'react-router'

export const useTodoQuery = () => {
  const params = useParams()

  return useQuery({
    queryKey: ['todo', params.id],
    queryFn: () => {
      return todoApi.fetchTodo(Number(params.id))
    },
  })
}
