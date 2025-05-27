import { type ReactNode } from 'react'
import { TodosContext } from '../context/todos.context'
import { useTodos } from '../hooks/useTodos'

type TodoProvideProps = {
  children: ReactNode
}

export const TodosProvider = ({ children }: TodoProvideProps) => {
  const todosState = useTodos()

  return <TodosContext.Provider value={todosState}>{children}</TodosContext.Provider>
}
