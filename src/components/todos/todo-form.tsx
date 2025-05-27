import { useState } from 'react'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('') // VŽDY NA ZAČÁTKU KOMPONENTY, nesmí být za podmínkou nebo na konci komponenty

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.value)
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    console.log('Form submitted with todo:', todoName)
  }

  return (
    <div className="input-group">
      <input value={todoName} onChange={handleInputChange} name="todo-text" placeholder="What needs to be done?" />
      <button onClick={handleSubmit} type="submit">
        Add
      </button>
    </div>
  )
}
