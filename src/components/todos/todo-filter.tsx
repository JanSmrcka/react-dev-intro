import { useEffect, useState, type ChangeEvent } from 'react'

export interface TodoFilterValues {
  status: 'all' | 'active' | 'completed'
  priority: number | 'all'
  search: string
}

interface TodoFilterProps {
  onFilterChange: (filters: TodoFilterValues) => void
}

export const TodoFilter = ({ onFilterChange }: TodoFilterProps) => {
  const [status, setStatus] = useState<TodoFilterValues['status']>('all')
  const [priority, setPriority] = useState<TodoFilterValues['priority']>('all')
  const [search, setSearch] = useState('')

  // Automatically trigger filter change after a delay
  // This is a "debounce" effect to avoid too many calls.
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({ status, priority, search })
    }, 300);

    return () => clearTimeout(timeout)
  }, [search, status, priority, onFilterChange])

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TodoFilterValues['status'])
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value === 'all' ? 'all' : Number(e.target.value))
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="w-full max-w-2xl bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-md backdrop-blur-md">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by name..."
        className="flex-1 bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      {/* Status */}
      <select
        value={status}
        onChange={handleStatusChange}
        className="bg-slate-700 text-white rounded-md px-3 py-2 border border-slate-600 focus:outline-none"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={priority}
        onChange={handlePriorityChange}
        className="bg-slate-700 text-white rounded-md px-3 py-2 border border-slate-600 focus:outline-none"
      >
        <option value="all">All Priorities</option>
        <option value="1">High (1)</option>
        <option value="2">Medium (2)</option>
        <option value="3">Low (3)</option>
      </select>
    </div>
  )
}
