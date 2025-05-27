import { useEffect, useState } from "react";
import type { Todo } from '../types';
import { todoApi } from '../api/todoApi';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await todoApi.fetchTodos();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
            setError("Failed to fetch todos. Please try again later.");
        } finally {
            setIsLoading(false);
        };
    };

    const addTodo = async (todoName: string) => {
        setIsUpdating(true);
        setError(null);
        try {
            const newTodo = await todoApi.createTodo(todoName);
            setTodos((prevTodos) => {
                return [...prevTodos, newTodo]
            });
        } catch (error) {
            console.error("Error adding todo:", error);
            setError("Failed to add todo. Please try again later.");
        } finally {
            setIsUpdating(false);
        }
    };

    const removeTodo = async (todoId: number) => {
        setIsUpdating(true);
        setError(null);
        try {
            await todoApi.deleteTodo(todoId);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
        } catch (error) {
            console.error("Error removing todo:", error);
            setError("Failed to remove todo. Please try again later.");
        } finally {
            setIsUpdating(false);
        }
    };

    const toggleTodo = async (todoId: number, completed: boolean) => {
        setIsUpdating(true);
        setError(null);
        try {
            const updatedTodo = await todoApi.toggleTodo(todoId, !completed);
            setTodos((prevTodos) => prevTodos.map((todo) => todo.id === todoId ? updatedTodo : todo));
        } catch (error) {
            console.error("Error toggling todo:", error);
            setError("Failed to toggle todo. Please try again later.");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        //console.log("use effect called");
        fetchTodos();
    }, []);

    return {
        todos,
        isLoading,
        isUpdating,
        addTodo,
        toggleTodo,
        removeTodo,
        error,
        refetch: fetchTodos,
        fetchTodos
    }
}