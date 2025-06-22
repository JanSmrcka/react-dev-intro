import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'

import { FaArrowDown, FaArrowUp, FaAngleDoubleUp } from 'react-icons/fa'
import { Link, useLocation } from 'react-router'
import type { MouseEvent } from 'react'

type TodoItemProps = {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()
  const location = useLocation()

  const handleDeleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    deleteTodo(todo.id)
  }

  const handleToggleTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  const { priority, completed, name, id } = todo

  const getPriorityIcon = (priority?: number) => {
    if (priority === 1) {
      return <FaArrowDown style={{ color: 'green' }} title="Low priority" />
    }
    if (priority === 2) {
      return <FaArrowUp style={{ color: 'gray' }} title="Medium priority" />
    }
    if (priority === 3) {
      return <FaAngleDoubleUp style={{ color: 'red' }} title="High priority" />
    }
    return null
  }

  return (
    <Link
      to={`/todos/${id}`}
      state={{ backgroundLocation: location }}
      className="todo-item-link"
    >
      <li className={`todo-item${completed ? ' completed' : ''}`}>
        <span>{name}</span>
        <span className="priority-icon" style={{ marginLeft: 'auto' }}>
          {getPriorityIcon(priority)}
        </span>
        <button type="button" onClick={handleDeleteTodo}>
          Delete
        </button>
        <button type="button" onClick={handleToggleTodo} className="toggle">
          {completed ? 'Undo' : 'Completed'}
        </button>
      </li>
    </Link>
  )
}
