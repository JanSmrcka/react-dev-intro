import { Link } from 'react-router'
import { Spinner } from '../components/spinner'
import { useTodoQuery } from '../hooks/useTodoQuery'

const TodoDetailPage = () => {
  const { data: todo, isLoading, isError } = useTodoQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Spinner />
      </div>
    )
  }

  if (isError || !todo) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <p className="text-red-400 text-lg font-medium">⚠️ Could not load this todo item.</p>
        <Link to="/">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium">
            ← Back to Home
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10 flex flex-col items-center text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="bg-element-1 absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
             style={{left: '10%', top: '20%'}}></div>
        <div className="bg-element-2 absolute w-80 h-80 bg-gray-500/10 rounded-full blur-3xl"
             style={{right: '10%', bottom: '20%'}}></div>

        <div
          className="absolute top-20 left-10 text-blue-400/20 font-mono text-sm"
        >
          {'{ ... }'}
        </div>
        <div
          className="absolute top-40 right-20 text-gray-400/20 font-mono text-sm"
        >
          &lt; /&gt;
        </div>
      </div>
      
      <section
        aria-labelledby="todo-detail-heading"
        className="w-full max-w-xl mt-8 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-md"
      >
        <h2 id="todo-detail-heading" className="text-2xl font-semibold mb-4 text-blue-400">
          {todo.name}
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Status:</span>
            <span
              className={`font-semibold ${
                todo.completed ? 'text-green-400' : 'text-yellow-400'
              }`}
            >
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Priority:</span>
            <span className="font-semibold text-purple-400">{todo.priority ?? 'N/A'}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-slate-300 font-medium mb-2">Description</h3>
          {todo.description ? (
            <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{todo.description}</p>
          ) : (
            <p className="text-slate-500 italic">No additional details provided.</p>
          )}
        </div>
      </section>

      <div className="mt-6">
        <Link to="/">
          <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium">
            ← Back to Todo List
          </button>
        </Link>
      </div>
    </div>
  )
}

export default TodoDetailPage
