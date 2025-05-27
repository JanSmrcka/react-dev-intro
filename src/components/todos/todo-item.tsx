import type { Todo } from '../../types.ts'
import { useTodosContext } from '../../hooks/useTodosContext.ts'
import { Link } from 'react-router'

type TodoItemProps = {
  todo: Todo

}

export const TodoItem = ({todo}: TodoItemProps )=> {

  const { deleteTodo, toggleTodo, isLoading } = useTodosContext();

  const handleDelete = () => {
    deleteTodo(todo.id);
  }


  const toggleCompletion = () => {
    toggleTodo(todo.id, !todo.completed);
  }

  return(
    <li className={`${todo.completed ? 'completed' : ''}${isLoading ? ' isLoading' : ''}`}>
      <span>{todo.name}</span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={toggleCompletion} className='toggle'>{todo.completed ? 'Undo' : 'Completed' }</button>
      <Link className={'link'} to={`/todo/${todo.id}`}>Go to detail</Link>
    </li>
  )
}
