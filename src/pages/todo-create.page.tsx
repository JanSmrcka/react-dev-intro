
import { TodoForm } from '../components/todos/todo-form.tsx'

const TodoCreatePage = () => {
  
  function handleSubmit() {
    // Redirect to index page
    window.location.href = '/';
  }
  
  return (
    <div
      className="w-screen h-screen relative overflow-hidden flex flex-row justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
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

      <div className="flex justify-center items-center">
        <div className="min-w-2xl text-white flex flex-col gap-5">
          <>
            <div className="relative gap-y-5 flex flex-col">
              <div className="flex flex-row justify-start items-center leading-none gap-5 text-white">
                <div className="bg-slate-100 h-[2px] w-[20px]"></div>
                <h2
                  className="text-[20px] md:text-[30px] jb-mono leading-none font-bold text-slate-100"
                >
                  <span className="text-purple-400">type</span>
                  <span className="text-blue-400"> Todos </span>
                  <span className="text-slate-400">=</span>
                  <span className="text-slate-500"> {'{ ... }'} </span>
                </h2>
              </div>
            </div>
            <p className="text-[15px] text-slate-100">
              Type your todo below to add it to the database.
            </p>
          </>
          <TodoForm formSubmissionEvent={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default TodoCreatePage;
