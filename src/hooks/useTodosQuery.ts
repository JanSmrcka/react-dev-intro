import { useQuery } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi.ts'

export const useTodosQuery = ()=>{
  return useQuery({
    queryKey:['todos'],
    queryFn:()=>todoApi.fetchTodos()
  })
}