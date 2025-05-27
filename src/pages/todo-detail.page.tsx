import { ErrorMessage } from '../components/error-message'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '../components/spinner'
import { todoApi } from '../api/todoApi'
import { Link, useParams, useNavigate } from 'react-router'

export default function TodoDetailPage() {
  const params = useParams()
  const navigate = useNavigate()

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todo', params.id],
    queryFn: () => {
      return todoApi.fetchTodo(Number(params.id))
    },
  })

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
