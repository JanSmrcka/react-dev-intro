import { useState } from 'react'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    console.log("Input changed to: "+ value)
    setTodoName(value);
  }

  const handleSubmit = () => {
    console.log("Form submitted");
  }

  return(
    <form id="todo-form">
      <div className="input-group">
        <input onChange={handleInputChange} value={todoName} name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
        <button onClick={handleSubmit} type="submit" id="add-btn">
          Add
        </button>
      </div>
    </form>
  )
}
