import { useContext } from 'react'
import { TodosContext } from '../../context/todos.context'

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if(context === undefined) {
    throw new Error("nejakej error")
  }
  return context
}
