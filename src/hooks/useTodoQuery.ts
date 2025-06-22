import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { todoApi } from '../api/todoApi'

export const useTodoQuery = (idParam?: number) => {
  const params = useParams()
  const id = idParam ?? Number(params.id)
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => {
      return todoApi.fetchTodo(id)
    },
  })
}
