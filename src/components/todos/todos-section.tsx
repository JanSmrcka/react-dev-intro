import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';
import { useState, useEffect } from 'react';
import type { Todo } from '../../types';
import { todoApi } from '../../api/todoApi';
import { Spinner } from '../spinner';

export const TodosSection = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const data = await todoApi.fetchTodos();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setIsLoading(false);
        };
    };

    const addTodo = async (todoName: string) => {
        try {
            const newTodo = await todoApi.createTodo(todoName);
            setTodos((prevTodos) => {
                return [...prevTodos, newTodo]
            });
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const removeTodo = async (todoId: number) => {
        try {
            await todoApi.deleteTodo(todoId);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
        } catch (error) {
            console.error("Error removing todo:", error);
        }
    };

    const toggleTodo = async (todoId: number, completed: boolean) => {
        try {
            const updatedTodo = await todoApi.toggleTodo(todoId, !completed);
            setTodos((prevTodos) => prevTodos.map((todo) => todo.id === todoId ? updatedTodo : todo));
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    useEffect(() => {
        //console.log("use effect called");
        fetchTodos();
    }, []);

    return (
        <main>
            <TodoForm addTodo={addTodo} />
            <div className="todo-container">
                <ul id="todo-list">
                    {todos.map((todo) => {
                        return <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
                    })}
                </ul>
                {isLoading && todos.length === 0 && <Spinner />}
            </div>
        </main>
    )
};