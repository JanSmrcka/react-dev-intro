import { useState } from 'react';

export const TodoForm = () => {
    const [todoName, setTodoName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.target.value);
    };

    const handleSubmit = () => {
        console.log("adding todo: ", todoName);
    };

    return (
        <div className="input-group">
            <input value={todoName} onChange={handleInputChange} name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
            <button onClick={handleSubmit} type="submit" id="add-btn">
                Add
            </button>
        </div>
    )
};