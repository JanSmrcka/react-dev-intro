import { Link, useSearchParams } from 'react-router'
import { ErrorMessage } from '../components/error-message'
import { Spinner } from '../components/spinner'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoToggle } from '../hooks/useTodoToggle'

// TODO modify todo
// TODO confirm delete
// TODO undo delete, do not redirect, but show deleted task instead

export default function TodoDetailPage() {
  const [searchParams] = useSearchParams()
  const { data: todo, isLoading, isError } = useTodoQuery()
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()

  // Preserve all existing search parameters
  const backLink = `/?${searchParams.toString()}`

  const handleDeleteTodo = () => {
    if (todo) {
      deleteTodo(todo.id)
      window.location.href = backLink
    }
  }

  const handleToggleTodo = () => {
    if (todo) {
      toggleTodo({ id: todo.id, completed: !todo.completed })
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!todo || isError) {
    return (
      <>
        <ErrorMessage message="Todo not found" onDissmis={() => (window.location.href = backLink)} />
        <Link to={backLink} className="back-button">
          Back to Tasks
        </Link>
      </>
    )
  }

  return (
    <>
      <Link to={backLink} className="back-button">
        Back to Tasks
      </Link>
      <div className="todo-detail">
        <h1>Todo Detail</h1>
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            <p>
              Status:{' '}
              <span className={todo.completed ? 'completed' : 'active'}>
                {todo.completed ? 'Completed' : 'Not completed'}
              </span>
            </p>
          </div>
          <p>Priority: {todo.priority ? todo.priority : 'No priority'}</p>
          <div className="todo-detail-description">
            <p>Description: {todo.description ? todo.description : 'No description'}</p>
          </div>
          <div className="todo-actions">
            <button onClick={handleDeleteTodo}>Delete</button>
            <button onClick={handleToggleTodo} className="toggle">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
