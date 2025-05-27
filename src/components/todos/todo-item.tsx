import type { Todo } from '../../types'
import { useTodoContext } from '../../hooks/useTodosContext';

type TodoItemProps = {
    todo: Todo;
    removeTodo: (todoId: number) => void;
    toggleTodo: (todoId: number, completed: boolean) => void;
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
        </li>
    )
};