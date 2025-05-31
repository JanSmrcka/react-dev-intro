import { Link, useNavigate, useParams } from 'react-router'
import { Header } from '../components/header'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoToggle } from '../hooks/useTodoToggle'

const TodoDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const todoId = Number(id)

  const {
    data: todo,
    isLoading: isLoadingTodo,
    isError: isErrorTodo,
    refetch,
  } = useTodoQuery(todoId)

  const {
    mutate: deleteTodo,
    status: deleteStatus,
    error: deleteError,
  } = useTodoDelete()
  const isDeleting = deleteStatus === 'pending'

  const {
    mutate: toggleTodo,
    status: toggleStatus,
    error: toggleError,
  } = useTodoToggle()
  const isToggling = toggleStatus === 'pending'

  if (isLoadingTodo) {
    return (
      <div className="loading-text">
        <p>Loading...</p>
      </div>
    )
  }

  if (isErrorTodo || !todo) {
    return (
      <div className="todo-detail-error">
        <p>Could not load todo item.</p>
        <Link to="/" className="back-link">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    deleteTodo(todo.id, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  const handleToggle = () => {
    toggleTodo(
      { id: todo.id, completed: !todo.completed },
      {
        onSuccess: () => {
          refetch()
        },
      },
    )
  }

  return (
    <>
      <Header title="Todo Detail" subtitle="Here is the detail of your todo" />

      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>

          <div className="todo-detail-status">
            Status:{' '}
            <span className={todo.completed ? 'completed' : 'active'}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>

          <div className="todo-detail-status">
            Priority: <span className="active">{todo.priority ?? '—'}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}

          <div className="detail-actions">
            <button
              onClick={handleToggle}
              disabled={isToggling}
              className="btn-toggle"
            >
              Toggle
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn-delete"
            >
              Delete Todo
            </button>
          </div>

          {(toggleError || deleteError) && (
            <div className="error-message detail-error-message">
              <div className="error-content">
                <span className="error-icon">!</span>
                <span>{(toggleError ?? deleteError)?.message}</span>
              </div>
            </div>
          )}
        </div>

        <Link to="/" className="back-link">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </>
  )
}

export default TodoDetailPage
