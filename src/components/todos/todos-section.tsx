import { useEffect, useState } from 'react'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import type { Todo } from '../../types'
import { todoApi } from '../../api/todoApi'
import { Spinner } from './spinner'

export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTodos = async () => {
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== newTodo.id).concat(newTodo))
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTodo = async (todoId: number) => {
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleTodo = async (todoId: number, completed: boolean) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo))
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main>
      <TodoForm addTodo={addTodo} />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
          })}
        </ul>
        {isLoading && todos.length === 0 && <Spinner />}
      </div>
    </main>
  )
}
