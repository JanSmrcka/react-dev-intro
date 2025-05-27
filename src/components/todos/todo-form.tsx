import { useState, type ChangeEvent } from 'react'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', e.target.value)
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Form submitted with todo:', todoName)
  }

  return (
    <form id="todo-form">
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
    </form>
  )
}
