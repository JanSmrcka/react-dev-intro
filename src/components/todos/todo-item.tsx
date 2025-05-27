import type { Todo } from '../../types'

type TodoItemProps = {
    todo: Todo;
    removeTodo: (todoId: number) => void;
    toggleTodo: (todoId: number, completed: boolean) => void;
};

export const TodoItem = ({ todo, removeTodo, toggleTodo }: TodoItemProps) => {
    const handleDelete = () => {
        removeTodo(todo.id);
    };

    const handleToggle = () => {
        toggleTodo(todo.id, todo.completed);
    };

    return (
        <li className={todo.completed ? "completed" : ""}>
            <span>{todo.name}</span>
            <button className="toggle" onClick={handleToggle} >{todo.completed ? "Undo" : "Completed"}</button>
            <button onClick={handleDelete} >Delete</button>
        </li>
    )
};