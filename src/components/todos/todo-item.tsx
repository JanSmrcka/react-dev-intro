import type { Todo } from '../../types'

type TodoItemProps = {
    todo: Todo;
    removeTodo: (todoId: number) => void;
};

export const TodoItem = ({ todo, removeTodo }: TodoItemProps) => {
    const handleDelete = () => {
        removeTodo(todo.id);
    };
    return (
        <li>
            <span>{todo.name}</span>
            <button onClick={handleDelete} >Delete</button>
        </li>
    )
};