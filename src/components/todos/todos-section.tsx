import { useEffect, useState } from 'react'
import { TodoItem } from './todo-item'
import { TodoForm } from './todos-form'
import type { Todo } from '../../types'
import { todoApi } from '../../api/todoApi'

export const TodosSection = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const fetchTodos = async () => {
        try {
            const data = await todoApi.fetchTodos()
            setTodos(data)
        } catch (error) {
            console.error('Failed to fetch todos:', error)
        }
    }

    const addTodo = async (todoName: string) => {
        try {
            const newTodo = await todoApi.createTodo(todoName)
            setTodos((prevTodos)=> {
                return [...prevTodos, newTodo]
            })
        } catch (error) {
            console.error("error adding new todo")
        }
    }

    useEffect(()=>{
        fetchTodos()
    }, [])

  return (
    <main>
      <TodoForm addTodo={addTodo}/>
      <div className="todo-container">
        <ul id="todo-list">
            {todos.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} />
            })}
        </ul>
      </div>
    </main>
  )
}
