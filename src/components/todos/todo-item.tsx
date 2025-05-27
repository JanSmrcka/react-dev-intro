import type { Todo } from '../../types'
import { useTodoContext } from '../../hooks/useTodosContext';
import { Link } from 'react-router';

type TodoItemProps = {
    todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
    const { removeTodo, toggleTodo } = useTodoContext();
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
            <Link to={`/todos/${todo.id}`} className="link">Go to detail</Link>
        </li>
    )
};