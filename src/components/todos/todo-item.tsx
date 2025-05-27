import { Link } from 'react-router'
import type { Todo } from '../../types'
import { useTodosContext } from '../hooks/useTodosContext'

type TodoItemProps = { todo: Todo }

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, toggleTodo } = useTodosContext()

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>

      <button onClick={() => deleteTodo(todo.id)}>Delete</button>

      <button className="toggle" onClick={() => toggleTodo(todo)}>
        {todo.completed ? 'Undo' : 'Completed'}
      </button>
      <Link to={`/todos/${todo.id}`} className="link">
        Go To Detail
      </Link>
    </li>
  )
}
