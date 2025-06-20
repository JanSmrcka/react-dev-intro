import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'
import { useEffect } from 'react'
import './todo-form-detailed.css'

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
        className="todo-form-detailed-header"
        onClick={() => setCollapsed((c) => !c)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', userSelect: 'none' }}
      >
        <span
          className="todo-form-detailed-arrow"
          style={{
            display: 'inline-block',
            marginRight: 8,
            transition: 'color 0.2s',
          }}
        >
          {collapsed ? '▶' : '▼'}
        </span>
        <h3 style={{ margin: 0 }}>Add New Task</h3>
      </div>
      <div
        className={`todo-form-detailed-content${collapsed ? ' collapsed' : ''}`}
        style={{
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
          maxHeight: collapsed ? 0 : 600,
          opacity: collapsed ? 0 : 1,
        }}
      >
        <form onSubmit={handleSubmit} className="todo-form-detailed" style={{ marginTop: 16 }}>
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
