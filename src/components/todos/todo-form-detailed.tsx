import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

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
    <form onSubmit={handleSubmit} className="todo-form-detailed">
      <h3>Add New Task</h3>
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
  )
}
