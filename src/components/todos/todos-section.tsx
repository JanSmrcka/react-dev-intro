import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';
import { Spinner } from '../spinner';
import { ErrorMessage } from '../error';
import { useTodoContext } from '../../hooks/useTodosContext';

export const TodosSection = () => {
    const { todos, isLoading, isUpdating, addTodo, toggleTodo, removeTodo, error, fetchTodos } = useTodoContext();

    return (
        <main>
            {error && <ErrorMessage message={error} onDismiss={fetchTodos} />}
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
