import { useEffect, useState } from 'react'
import type { Todo } from '../types'
import { todoApi } from '../api/todoApi'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTodos = async () => {
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    setIsLoading(true)
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo]
      })
    } catch (error) {
      console.error('Failed to save new todo: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTodo = async (todoId: number) => {
    setIsLoading(true)
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error('Failed to save new todo: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todoId: number, completed: boolean) => {
    setIsLoading(true)
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo)))
    } catch (error) {
      console.log(error)
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
  }
}
