import { useEffect, useState } from 'react'
import type { Todo } from '../types.ts'
import { todoService } from '../api/todoApi.ts'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>( null);

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try{
      const data = await todoService.fetchTodos();
      setTodos(data);
    }
    catch(err){
      setError('Failed to fetch todos');
      console.error("Failed to fetch todos:", err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const addTodo = async (todoValue: string) => {
    setIsLoading(true);
    setError(null);
    try{
      const newTodo = await todoService.createTodo(todoValue);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    catch(err){
      setError('Failed to add todo');
      console.error("Failed to add todo:", err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const deleteTodo = async (todoId: number) => {
    setIsLoading(true);
    setError(null);
    try{
      await todoService.deleteTodo(todoId);
      setTodos((prevTodos)=> prevTodos.filter(item => item.id !== todoId));
    }
    catch(err){
      setError('Failed to delete todo');
      console.error("Failed to delete todo:", err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const toggleTodo = async (todoId: number, state: boolean) => {
    setError(null);
    try{
      const updatedTodo = await todoService.toggleCompletion(todoId, state);
      setTodos((prevTodos) => prevTodos.map(todo => todo.id === todoId ? updatedTodo : todo));
    }
    catch(err){
      setError('Failed to toggle todo completion');
      console.error("Failed to toggle todo completion:", err);
    }
  }

  return {
    todos,
    error,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos
  }
}
