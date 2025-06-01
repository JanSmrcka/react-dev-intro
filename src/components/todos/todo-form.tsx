import { useState, type ChangeEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

// TODO clear form after submit
// TODO send with enter

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('') // Pole - na prvni posici je hodnota stavu, na druhe funkce

  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    mutate(todoName)
  }

  return (
    <div className="input-group">
      <input value={todoName} onChange={handleInputChange} name="todo-text" placeholder="What needs to be done?" />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}
