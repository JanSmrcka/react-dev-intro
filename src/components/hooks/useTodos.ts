import { useEffect, useState } from 'react'
import { todoApi } from '../../api/todoApi'
import type { Todo } from '../../types'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch', error)
      setError('Failed to getch')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTodo = async (id: number): Promise<Todo | undefined> => {
    let todo = undefined
    try {
      todo = await todoApi.fetchTodo(id)
      return todo
    } catch (error) {
      console.error('Failed to fetch', error)
      setError('Failed to getch')
    }
    return todo
  }

  const addTodo = async (todoName: string) => {
    setIsLoading(true)
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo]
      })
    } catch (error) {
      console.error(error)
      setError('Failed to add todo')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTodo = async (todoId: number) => {
    setIsLoading(true)
    try {
      await todoApi.deleteTodo(todoId)
      setTodos(todos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error(error)
      setError('Failed to delete todo')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todo: Todo) => {
    setIsLoading(true)
    try {
      const updatedTodo = await todoApi.toggleTodo(todo.id, !todo.completed)
      setTodos((prevTodos) => prevTodos.map((mappedTodo) => (mappedTodo.id === todo.id ? updatedTodo : todo)))
    } catch (error) {
      console.error(error)
      setError('Failed to delete todo')
    } finally {
      setIsLoading(false)
    }
  }

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
    fetchTodo,
  }
}
