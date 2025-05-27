import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';
import { Spinner } from '../spinner';
import { useTodos } from '../../hooks/useTodos';

export const TodosSection = () => {
    const { todos, isLoading, isUpdating, addTodo, toggleTodo, removeTodo } = useTodos();

    return (
        <main>
            <TodoForm addTodo={addTodo} />
            <div className="todo-container">
                <ul className={isUpdating ? "isLoading" : ""} id="todo-list">
                    {todos.map((todo) => {
                        return <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
                    })}
                </ul>
                {isLoading && todos.length === 0 && <Spinner />}
            </div>
        </main>
    )
};