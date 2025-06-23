import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'
import { useEffect } from 'react'
import '../../todo-form-detailed.css'

type TodoFormData = {
  name: string
  description: string
  priority: number
}

export const TodoFormDetailed = () => {
  const [formData, setFormData] = useState<TodoFormData>({
    name: '',
    description: '',
    priority: 1,
  })
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('todoFormDetailedCollapsed')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('todoFormDetailedCollapsed', String(collapsed))
  }, [collapsed])

  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate(formData)
    setFormData({
      name: '',
      description: '',
      priority: 1,
    })
  }

  return (
    <div className="todo-form-detailed-collapsible">
      <div
        className="todo-form-detailed-header todo-form-detailed-header-clickable"
        onClick={() => setCollapsed((c) => !c)}
      >
        <span className={`todo-form-detailed-arrow${collapsed ? ' collapsed' : ''}`}>{collapsed ? '▶' : '▼'}</span>
        <h3 className="todo-form-detailed-title">Add New Task</h3>
      </div>
      <div className={`todo-form-detailed-content${collapsed ? ' collapsed' : ''}`}>
        <form onSubmit={handleSubmit} className="todo-form-detailed">
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange}>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  )
}
