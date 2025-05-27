import type { Todo } from '../../types'

type TodoItemProps = {
  todo: Todo
  deleteTodo: (todoId: number) => void
}

export const TodoItem = ({ todo, deleteTodo }: TodoItemProps) => {
  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  return (
    <li>
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
    </li>
  )
}
