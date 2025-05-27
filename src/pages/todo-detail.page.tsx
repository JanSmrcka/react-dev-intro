import { Link, useParams } from 'react-router'
import { useTodoContext } from '../hooks/useTodosContext'

export default function TodoDetailPage() {
  const params = useParams()
  const { todos } = useTodoContext()
  const todo = todos.find((todo) => todo.id === Number(params.id))

  if (!todo) {
    return <div>Todo not found</div>
  }

  return (
    <>
      <Link to="/" className="back-button">
        Back to Tasks
      </Link>
      <div className="todo-detail">
        <h1>Todo Detail</h1>
        <div className="todo-info">
          <h2>{todo.name}</h2>
          <p>Status: {todo.completed ? 'Completed' : 'Not completed'}</p>
          <p>Priority: {todo.priority ? todo.priority : 'No prioritz'}</p>
          <p>Description: {todo.completed ? todo.completed : 'No description'}</p>
        </div>
      </div>
    </>
  )
}
