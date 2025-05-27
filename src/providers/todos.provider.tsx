import type { ReactNode } from 'react'
import { TodosContext } from '../context/todos.context'
import { useTodos } from '../hooks/useTodos'

type TodosProviderProps = {
  children: ReactNode
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const todosState = useTodos()

  return <TodosContext.Provider value={todosState}>{children}</TodosContext.Provider>
}
