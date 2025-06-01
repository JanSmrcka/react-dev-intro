import { useState, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

interface TodoFormProps {
  formSubmissionEvent?: () => void;
}

export const TodoForm = ({ formSubmissionEvent }: TodoFormProps) => {
  const [todoName, setTodoName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(2) // default medium

  const { mutate } = useTodoCreate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!todoName.trim()) {
      return;
    }

    mutate({ name: todoName, description, priority });
    setTodoName('');
    setDescription('');
    setPriority(2);

    if (formSubmissionEvent) {
      setTimeout(() => {
        formSubmissionEvent()
      }, 250);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-white">
      <div className="bg-slate-800 rounded-xl px-4 py-3 shadow-md backdrop-blur-md">
        <input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          name="todo-text"
          placeholder="What needs to be done?"
          className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none"
        />
      </div>
      
      <div className="bg-slate-800 rounded-xl px-4 py-3 shadow-md backdrop-blur-md">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="todo-description"
          placeholder="Optional description..."
          rows={3}
          className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none resize-none"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <label htmlFor="priority" className="text-sm text-slate-300">
            Priority:
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="bg-slate-800 text-white border border-slate-600 rounded-md px-3 py-1 focus:outline-none"
          >
            <option value={1}>High (1)</option>
            <option value={2}>Medium (2)</option>
            <option value={3}>Low (3)</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors font-medium text-white"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}
