import { useEffect, useState } from "react"
import { todoApi } from "../api/todoApi"
import type { Todo } from "../types"

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
      console.error(error)
        setError('Failed to fetch todos. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    setError(null)
    setIsLoading(true)
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== newTodo.id).concat(newTodo))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setError('Failed to add todo. Please try again later.')

    } finally {
      setIsLoading(false)
    }
  }
  const deleteTodo = async (todoId: number) => {
    setError(null)
    setIsLoading(true)
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId)
      })
      setIsLoading(false)
    } catch (error) {
        setError('Failed to delete todo. Please try again later.')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todoId: number, completed: boolean) => {
    setIsLoading(true)
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo))
      })
      setIsLoading(false)
    } catch (error) {
        setError('Failed to toggle todo. Please try again later.')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    error,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos
  }

}