import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Link } from 'react-router'
import { useTodoQuery } from '../../hooks/useTodoQuery'
import { Spinner } from '../spinner'
import { TodoDetailContent } from './todo-detail-content'

export const TodoDetailDrawer = ({ id, isOpen, onClose }: { id: number; isOpen: boolean; onClose: () => void }) => {
  const { data: todo, isError, isLoading } = useTodoQuery(id)

  let content
  if (isLoading) {
    content = <Spinner />
  } else if (isError || !todo) {
    content = (
      <div className="todo-detail-error">
        <p>Could not load todo item.</p>
      </div>
    )
  } else {
    content = <TodoDetailContent todo={todo} />
  }

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size="30vw"
      overlayColor="rgba(0, 0, 0, 0.5)"
      duration={300}
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="todo-detail">
        {content}
        <Link to="/">
          <button className="back-button" onClick={onClose}>
            Back to Home
          </button>
        </Link>
      </div>
    </Drawer>
  )
}
