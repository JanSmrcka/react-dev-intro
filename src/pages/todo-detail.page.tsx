import { Link, useSearchParams } from 'react-router'
import { ErrorMessage } from '../components/error-message'
import { Spinner } from '../components/spinner'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoToggle } from '../hooks/useTodoToggle'
import { useDeleteConfirmation } from '../hooks/useDeleteConfirmation'
import { useTodoUpdate } from '../hooks/useTodoUpdate'
import { useState, type ChangeEvent } from 'react'

// TODO undo delete, do not redirect, but show deleted task instead

export default function TodoDetailPage() {
  const [searchParams] = useSearchParams()
  const { data: todo, isLoading, isError } = useTodoQuery()
  const { mutate: deleteTodo, isLoading: isDeleting } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()
  const { mutate: updateTodo } = useTodoUpdate()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    priority: 1,
  })

  // Preserve all existing search parameters
  const backLink = `/?${searchParams.toString()}`

  const handleDeleteTodo = () => {
    if (todo) {
      deleteTodo(todo.id, {
        onSuccess: () => {
          window.location.href = backLink
        },
      })
    }
  }

  const { isConfirming, handleDeleteClick } = useDeleteConfirmation(handleDeleteTodo)

  const handleToggleTodo = () => {
    if (todo) {
      toggleTodo({ id: todo.id, completed: !todo.completed })
    }
  }

  const handleEditClick = () => {
    if (todo) {
      setEditData({
        name: todo.name,
        description: todo.description || '',
        priority: todo.priority || 1,
      })
      setIsEditing(true)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) : value,
    }))
  }

  const handleSaveEdit = () => {
    if (todo) {
      updateTodo({
        id: todo.id,
        ...editData,
        completed: todo.completed,
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
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
          {isEditing ? (
            <>
              <div className="form-group">
                <label htmlFor="name">Task Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editData.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select id="priority" name="priority" value={editData.priority} onChange={handleInputChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className="todo-actions">
                <button onClick={handleSaveEdit} className="toggle">
                  Save
                </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
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
                <button onClick={handleEditClick} className="edit">
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className={`delete ${isConfirming ? 'confirming' : ''}`}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : isConfirming ? 'Confirm' : 'Delete'}
                </button>
                <button onClick={handleToggleTodo} className="toggle">
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
