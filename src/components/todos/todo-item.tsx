import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'
import { Link } from 'react-router'

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
    <li className="w-full flex justify-between items-center rounded-xl bg-slate-800 border border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col justify-center">
    <span
      className={`text-lg font-medium ${
        todo.completed ? 'line-through text-slate-400' : 'text-white'
      }`}
    >
      {todo.name}
    </span>
        <Link
          to={`/todos/${todo.id}`}
          className="text-sm text-blue-400 hover:underline mt-1"
        >
          View Details →
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleTodo}
          className={`px-4 py-1 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
            todo.completed
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={handleDeleteTodo}
          className="px-4 py-1 text-sm font-medium text-red-600 hover:bg-red-700 hover:text-white cursor-pointer rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </li>

  )
}
