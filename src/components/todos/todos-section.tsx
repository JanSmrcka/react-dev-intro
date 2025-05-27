import { useEffect, useState } from 'react'
import type { Todo } from '../../types'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { todoApi } from '../../api/todoApi'

export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => {
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.log('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main>
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </main>
  )
}
