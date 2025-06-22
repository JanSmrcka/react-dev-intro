import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')

  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted with todo:', todoName)
    mutate(todoName)
    setTodoName('')
  }

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        value={todoName}
        onChange={handleInputChange}
        name="todo-text"
        placeholder="What needs to be done?"
      />
      <button type="submit">
        Add
      </button>
    </form>
  )
}
