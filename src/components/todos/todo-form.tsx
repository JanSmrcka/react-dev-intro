import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')
  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!todoName.trim()) return
    mutate(todoName)
    setTodoName('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex items-center bg-slate-800 rounded-xl px-4 py-3 shadow-md backdrop-blur-md w-full">
        <input
          value={todoName}
          onChange={handleInputChange}
          name="todo-text"
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded text-white rounded-left transition-colors duration-200"
        >
          Add
        </button>
      </div>
    </form>
  )
}
