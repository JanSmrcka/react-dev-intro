import { Link, useSearchParams } from 'react-router'
import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation'

// TODO: Double click to confirm delete
// TODO Undo delete
// TODO FIX: when user adds new task and instantly goes to detail, the task is not shown due to optimistic update.

type TodoItemProps = {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [searchParams] = useSearchParams()
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const { isConfirming, handleDeleteClick } = useDeleteConfirmation(handleDeleteTodo)

  const handleToggleTodo = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  // Preserve search parameters when navigating to detail
  const detailLink = `/todos/${todo.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={handleDeleteClick} className={isConfirming ? 'confirming' : ''}>
        {isConfirming ? 'Confirm' : 'Delete'}
      </button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? 'Undo' : 'Completed'}
      </button>
      <Link to={detailLink} className="link">
        Show detail
      </Link>
    </li>
  )
}
