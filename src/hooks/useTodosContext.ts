import { useContext } from 'react'
import { TodosContext } from '../context/todos.context.ts'

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  return context;
}
