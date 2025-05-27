import { useState } from 'react'
import { createTodo }  from '../store/todo.store.ts'
import { useAppDispatch } from '../helpers/hooks.ts'

function InputForm() {
  const [name, setName] = useState('');
  
  const dispatch = useAppDispatch();
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim() === '') {
      return;
    }

    console.log(name);
    dispatch(createTodo(name));
    setName(''); // Clear the input field after submission
  }
  
  return (
    <form id="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input value={name} onChange={handleInputChange} name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
        <button type="submit" id="add-btn">
          Add
        </button>
      </div>
    </form>
  );
}

export default InputForm;