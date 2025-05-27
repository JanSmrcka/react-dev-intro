export const TodoForm = () => {
  return (
    <form>
      <div className="input-group">
        <input name="todo-text" placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
