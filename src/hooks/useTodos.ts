import { useEffect, useState } from "react";
import type { Todo } from '../types';
import { todoApi } from '../api/todoApi';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

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
        setIsUpdating(true);
        try {
            const newTodo = await todoApi.createTodo(todoName);
            setTodos((prevTodos) => {
                return [...prevTodos, newTodo]
            });
        } catch (error) {
            console.error("Error adding todo:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const removeTodo = async (todoId: number) => {
        setIsUpdating(true);
        try {
            await todoApi.deleteTodo(todoId);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
        } catch (error) {
            console.error("Error removing todo:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const toggleTodo = async (todoId: number, completed: boolean) => {
        setIsUpdating(true);
        try {
            const updatedTodo = await todoApi.toggleTodo(todoId, !completed);
            setTodos((prevTodos) => prevTodos.map((todo) => todo.id === todoId ? updatedTodo : todo));
        } catch (error) {
            console.error("Error toggling todo:", error);
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
    }
}