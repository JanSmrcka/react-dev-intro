import { useEffect, useState } from 'react'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import type { Todo } from '../../types'
import { todoApi } from '../../api/todoApi'

export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => {
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos: ', error)
    }
  }

  const addTodo = async (todoName: string) => {
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo]
      })
    } catch (error) {
      console.error('Failed to save new todo: ', error)
    }
  }

  const deleteTodo = async (todoId: number) => {
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error('Failed to save new todo: ', error)
    }
  }

  // useEffect is a React Hook that lets you synchronize a component with external systems and handle side effects
  // It runs after every render and can optionally clean up when the component unmounts
  // The first argument is the effect function, the second is an optional dependency array
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main>
      <TodoForm addTodo={addTodo} />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
          })}
        </ul>
      </div>
    </main>
  )
}
