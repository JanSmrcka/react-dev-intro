import { type ReactNode } from 'react'
import { TodosContext } from '../context/todos.context'
import { useTodos } from '../hooks/useTodos'

type TodoProvideProps = {
  children: ReactNode
}

export const TodosProvider = ({ children }: TodoProvideProps) => {
  const todosState = useTodos()

  const contextValue = {
    ...todosState,
    toggleTodo: (id: number) => todosState.toggleTodo(id, !todosState.todos.find((t) => t.id === id)?.completed),
    deleteTodo: (id: number) => todosState.deleteTodo(id),
  }

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}
