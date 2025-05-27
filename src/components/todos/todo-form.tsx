export const TodoForm = () => {
    return (
        <form id="todo-form">
            <div className="input-group">
                <input name="todo-text" id="new-todo-input" placeholder="What needs to be done?" />
                <button type="submit" id="add-btn">
                    Add
                </button>
            </div>
        </form>
    )
};