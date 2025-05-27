import { useState } from "react";

export const TodoForm = () => {
    const [todoName, setTodoName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.target.value);
    };

    return (
        <form id="todo-form">
            <div className="input-group">
                <input value={todoName} onChange={handleInputChange} name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
                <button type="submit" id="add-btn">
                    Add
                </button>
            </div>
        </form>
    )
};