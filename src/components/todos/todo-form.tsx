import { useState, type ChangeEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')
  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.value)
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Form submitted with todo:', todoName)
    mutate(todoName)
  }

  return (
    <div className="input-group">
      <input value={todoName} onChange={handleInputChange} name="todo-text" placeholder="What needs to be done?" />
      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
    </div>
  )
}
