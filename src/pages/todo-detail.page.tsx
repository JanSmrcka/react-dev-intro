import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Todo } from '../types.ts'
import { todoService } from '../api/todoApi.ts'
import { Spinner } from '../components/spinner.tsx'

const TodoDetailPage = () => {

  const params = useParams<{ id: string }>()
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)
    const data = todoService.fetchSingleTodo(Number(params.id))
    data.then((todoData) => {
      setTodo(todoData);
    }).catch((error) => {
      console.error("Failed to fetch todo details:", error);
    }).finally(
      () => setLoading(false)
    );
  }, [])


  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>{todo?.name}</h1>
          <p>State: {todo?.completed ? 'Completed' : 'Not completed'}</p>
          <p>Description: {todo?.description}</p>
          <p>Priority: {todo?.priority}</p>
          <p>ID: {todo?.id}</p>
        </>
      )}
    </div>

  )
}

export default TodoDetailPage
