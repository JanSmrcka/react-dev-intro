import { useEffect, useState } from 'react'
import type { Todo } from '../types'
import { todoApi } from '../api/todoApi'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      setError('Failed to load todos: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await todoApi.createTodo(todoName)
      await fetchTodos()
    } catch (error) {
      setError('Failed to create todo: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTodo = async (todoId: number) => {
    setError(null)
    setIsLoading(true)
    try {
      await todoApi.deleteTodo(todoId)
      await fetchTodos()
    } catch (error) {
      setError('Failed to delete todo: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todoId: number, completed: boolean) => {
    setError(null)
    setIsLoading(true)
    try {
      await todoApi.toggleTodo(todoId, completed)
      await fetchTodos()
    } catch (error) {
      setError('Failed to update todo: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect is a React Hook that lets you synchronize a component with external systems and handle side effects
  // It runs after every render and can optionally clean up when the component unmounts
  // The first argument is the effect function, the second is an optional dependency array
  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    error,
    refetch: fetchTodos,
  }
}
