import { useCallback } from 'react'
import { useTodosQuery } from './useTodosQuery'
import { useTodoCreate } from './useTodoCreate'
import { useTodoToggle } from './useTodoToggle'
import { useTodoDelete } from './useTodoDelete'

export const useTodos = () => {
  const { data: todos = [], error, isLoading, refetch } = useTodosQuery()
  const { mutateAsync: createTodo } = useTodoCreate()
  const { mutateAsync: toggle } = useTodoToggle()
  const { mutateAsync: remove } = useTodoDelete()

  const addTodo = useCallback(
    (todoName: string) => {
      return createTodo(todoName)
    },
    [createTodo],
  )

  const toggleTodo = useCallback(
    (id: number, completed: boolean) => {
      return toggle({ id, completed })
    },
    [toggle],
  )

  const deleteTodo = useCallback(
    (id: number) => {
      return remove(id)
    },
    [remove],
  )

  return {
    todos,
    isLoading,
    error: error ? (error as Error).message : null,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch,
  }
}
