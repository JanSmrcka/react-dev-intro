import type { Todo } from '../../types'
import { Link } from 'react-router'
import { useTodoToggle } from '../../hooks/useTodoToggle'
import { useTodoDelete } from '../../hooks/useTododelete'

type TodoItemProps = {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <Link to={`/todos/${todo.id}`} className="link">
        Go to detail
      </Link>
    </li>
  )
}
