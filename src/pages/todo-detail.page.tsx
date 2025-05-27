import { Link, useParams } from 'react-router'
import { todoService } from '../api/todoApi.ts'
import { Spinner } from '../components/spinner.tsx'
import { useQuery } from '@tanstack/react-query'

const TodoDetailPage = () => {

  const params = useParams<{ id: string }>()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['todo', params.id],
    queryFn: () => todoService.fetchSingleTodo(Number(params.id)),
  })


  return (
    <>
    {isError ? (
      <>
        <p style={{ color: 'red' }}>Error: {'Failed to fetch todo details'}</p>
      </>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1>{data?.name}</h1>
          <p>State: {data?.completed ? 'Completed' : 'Not completed'}</p>
          <p>Description: {data?.description}</p>
          <p>Priority: {data?.priority}</p>
          <p>ID: {data?.id}</p>
        </>
      )}
      <Link to={'/'}>Go Back</Link>
    </>
  )
}

export default TodoDetailPage
