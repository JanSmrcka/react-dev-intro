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
      setTodoName('') // Clear form after submit
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
        onKeyPress={handleKeyPress}
        name="todo-text"
        placeholder="Quickly add task"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}
