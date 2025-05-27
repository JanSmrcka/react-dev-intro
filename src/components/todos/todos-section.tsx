import { TodoForm } from "./todo-form"
import { useEffect, useState } from 'react'
import type { Todo } from '../../types.ts'
import { todoService } from '../../api/todoApi.ts'
import { TodoItem } from './todo-item.tsx'

export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
     fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try{
      const data = await todoService.fetchTodos();
      setTodos(data);
    }
    catch(err){
      console.error("Failed to fetch todos:", err);
    }

  }

  return (
    <main>
      <TodoForm/>
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo}/>
        })}
        </ul>
      </div>
    </main>
  )
}
