import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')

  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    if (todoName.trim()) {
      mutate({ name: todoName })
      setTodoName('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="input-group">
      <input
        value={todoName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="todo-text"
        placeholder="Quickly add task"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}
