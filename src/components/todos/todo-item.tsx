import { Link } from 'react-router'
import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoTOggle'

type TodoItemProps = {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodoMutation } = useTodoToggle()

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      <button onClick={() => toggleTodoMutation({ todoId: todo.id, completed: !todo.completed })} className="toggle">
        {todo.completed ? 'Undo' : 'Completed'}
      </button>
      <Link to={`/todos/${todo.id}`} className="link">
        Go to Detail
      </Link>
    </li>
  )
}