import { Link, useNavigate } from 'react-router'
import { ErrorMessage } from '../components/error-message'
import { Spinner } from '../components/spinner'
import { useTodoQuery } from '../hooks/useTodoQuery'

export default function TodoDetailPage() {
  const navigate = useNavigate()
  const { data: todo, isLoading, isError } = useTodoQuery()

  if (isLoading) {
    return <Spinner />
  }

  if (!todo || isError) {
    return (
      <>
        <ErrorMessage message="Todo not found" onDissmis={() => navigate('/')} />
        <Link to="/" className="back-button">
          Back to Tasks
        </Link>
      </>
    )
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
