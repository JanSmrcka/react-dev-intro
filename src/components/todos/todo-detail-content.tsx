import type { Todo } from '../../types'

export const TodoDetailContent = ({ todo }: { todo: Todo }) => {
  return (
    <div className="todo-detail-card">
      <h2>{todo.name}</h2>
      <div className="todo-detail-status">
        Status:{' '}
        <span className={todo.completed ? 'completed' : 'active'}>
          {todo.completed ? 'Completed' : 'Active'}
        </span>
      </div>
      <div className="todo-detail-status">
        Priority: <span className={'completed'}>{todo.priority}</span>
      </div>
      {todo.description && (
        <div className="todo-detail-description">
          <p>{todo.description}</p>
        </div>
      )}
    </div>
  )
}
