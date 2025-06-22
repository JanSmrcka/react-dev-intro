import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

const DEFAULT_PRIORITY = 2

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(DEFAULT_PRIORITY)
  const [showOptions, setShowOptions] = useState(false)

  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTodoName(value)
    setShowOptions(value.trim().length > 0)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(e.target.value))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ name: todoName, description, priority })
    setTodoName('')
    setDescription('')
    setPriority(DEFAULT_PRIORITY)
    setShowOptions(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          value={todoName}
          onChange={handleInputChange}
          name="todo-text"
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </div>
      <div className={`todo-advanced ${showOptions ? 'open' : ''}`}>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
        <div className="priority-switch">
          <label>Priority</label>
          <div className="switch">
            <input
              type="radio"
              id="switch1"
              name="priority"
              value={1}
              checked={priority === 1}
              onChange={handlePriorityChange}
            />
            <label htmlFor="switch1" title="Low"></label>
            <input
              type="radio"
              id="switch2"
              name="priority"
              value={2}
              checked={priority === 2}
              onChange={handlePriorityChange}
            />
            <label htmlFor="switch2" title="Medium"></label>
            <input
              type="radio"
              id="switch3"
              name="priority"
              value={3}
              checked={priority === 3}
              onChange={handlePriorityChange}
            />
            <label htmlFor="switch3" title="High"></label>
            <div className="switch__inner"></div>
          </div>
          <div className="priority-labels">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </form>
  )
}
