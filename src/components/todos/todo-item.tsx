import type { Todo } from '../../types'
import { useTodoContext } from '../../hooks/useTodosContext'
import { Link } from 'react-router'

type TodoItemProps = {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, toggleTodo } = useTodoContext()
  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo(todo.id, todo.completed)
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <Link to={`/todos/${todo.id}`} className="lik">
        Go to detail
      </Link>
    </li>
  )
}
