import type { ReactNode } from 'react'
import { TodosContext } from '../context/todos.context'
import { useTodos } from '../components/hooks/useTodos'

type Props = {
  children: ReactNode
}

export const TodosProvider = (props: Props) => {
  const todosState = useTodos()

  return <TodosContext.Provider value={todosState}>{props.children}</TodosContext.Provider>
}
