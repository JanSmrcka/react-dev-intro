import { Header } from '../components/header'
import { TodosSection } from '../components/todos/todos-section'
import { TodoForm } from '../components/todos/todo-form.tsx'

const TodoListPage = () => {

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

      <div className="w-2/4 flex px-5 justify-center items-center">
        <div className="min-w-2xl text-white flex flex-col gap-5">
          <Header/>
          <TodoForm />
        </div>
      </div>
      <div className="w-2/4 h-full flex justify-center items-center p-5 md:p-10">
        <TodosSection />
      </div>
    </div>
  );
}

export default TodoListPage
