import { useState, type ChangeEvent } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')
  const { addTodo } = useTodosContext()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', e.target.value)
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    addTodo(todoName)
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
