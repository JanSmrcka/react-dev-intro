import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { useEffect, useState } from 'react'
import { TodoFilter, type TodoFilterValues } from './todo-filter.tsx'
import { useTodoFilter } from '../../hooks/useTodoFilter.ts'

export const TodosSection = () => {
  const { data, error, isLoading, refetch } = useTodosQuery();
  const { filterTodos } = useTodoFilter();

  // Filter functionality by name
  const [todos, setTodos] = useState(data || []);
  const handleFilterChange = (filters: TodoFilterValues) => {
    const filterResult =  filterTodos(data || [], filters);
    setTodos(filterResult);
  }
  
  // Set todos when data changes
  // Can this be done more differently?
  useEffect(() => {
    setTodos(data || []);
  }, [data]);
  
  return (
    <main className="w-full max-w-2xl flex flex-col gap-6 text-white">
      {error && (
        <div className="bg-red-700/20 border border-red-500 rounded-lg p-4">
          <ErrorMessage message={error.message} onDismiss={refetch} />
        </div>
      )}

      <div className="rounded-xl overflow-hidden max-h-[60vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-5">
            <TodoFilter onFilterChange={handleFilterChange} />
            <ul className="flex flex-col gap-4">
              {todos?.length ? (
                todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
              ) : (
                <p className="text-slate-400 text-sm text-center">No todos yet.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
