import type { Todo } from '../../types.ts'

type TodoItemProps = {
  todo: Todo
}

export const TodoItem = ({todo}: TodoItemProps) => {



  return(
    <li>
      <span>{todo.name}</span>
      <button className="btn btn-primary">Delete</button>
    </li>
  )
}
