import type { TodoFilterValues } from '../components/todos/todo-filter.tsx'
import type { Todo } from '../types.ts'

export const useTodoFilter = () => {
  
  function filterTodos(todos: Todo[], filters: TodoFilterValues): Todo[] {
    if (!todos) {
      return [] as Todo[];
    }

    let filteredTodos = todos;

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredTodos = filteredTodos.filter(todo =>
        todo.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by status
    if (filters.status !== 'all') {
      filteredTodos = filteredTodos.filter(todo =>
        filters.status === 'active' ? !todo.completed : todo.completed
      );
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      filteredTodos = filteredTodos.filter(todo => todo.priority === filters.priority);
    }

    return filteredTodos || [] as Todo[];
  }
  
  
  return { filterTodos };
};