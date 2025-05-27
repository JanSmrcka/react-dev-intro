import { useTodos } from '../../hooks/useTodos.ts'
import { TodosContext } from '../../context/todos.context.ts'

type Props = {
  children?: React.ReactNode;
}

export const TodosProvider = ({children}: Props) => {
  const todoState = useTodos();

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  )
}
