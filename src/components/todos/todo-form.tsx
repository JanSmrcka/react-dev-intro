import { useState } from 'react'
import { useTodosContext } from '../../hooks/useTodosContext.ts'


export const TodoForm = () => {
  const [todoName, setTodoName] = useState('');
  const {addTodo} = useTodosContext();


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Input changed to: "+ value)
    setTodoName(value);
  }

  const handleSubmit = () => {
    console.log("Form submitted");
    addTodo(todoName);
  }

  return(
    <form id="todo-form">
      <div className="input-group">
        <input onChange={handleInputChange} value={todoName} name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
        <button onClick={handleSubmit} type="button" id="add-btn">
          Add
        </button>
      </div>
    </form>
  )
}
