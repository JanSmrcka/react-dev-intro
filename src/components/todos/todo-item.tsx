import { Link } from 'react-router'
import type { Todo } from '../../types'
import { useTodoToggle } from '../hooks/useTodoToggle'
import { useTodoDelete } from '../hooks/useTodoDelete'

type TodoItemProps = { todo: Todo }

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: mutateToggle } = useTodoToggle()
  const { mutate: mutateDelete } = useTodoDelete()

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>

      <button onClick={() => mutateDelete(todo.id)}>Delete</button>

      <button className="toggle" onClick={() => mutateToggle(todo)}>
        {todo.completed ? 'Undo' : 'Completed'}
      </button>
      <Link to={`/todos/${todo.id}`} className="link">
        Go To Detail
      </Link>
    </li>
  )
}
