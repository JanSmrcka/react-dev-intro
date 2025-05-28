import { useState, type ChangeEvent } from 'react'
import { useTodoCreate } from '../hooks/useTodoCreate'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')
  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', e.target.value)
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    mutate(todoName)
    console.log('Form submitted with todo:', todoName)
  }

  return (
    <div className="input-group">
      <input
        value={todoName}
        onChange={handleInputChange}
        name="todo-text"
        id="new-todo-input"
        placeholder="What needs to be done?"
      />
      <button onClick={handleSubmit} type="submit" id="add-btn">
        Add
      </button>
    </div>
  )
}
