import { useSelector } from 'react-redux'
import type { RootState } from '../store/store.ts'
import type { Todo } from '../types/types.ts'

function TodoList() {
  // Retrieve the todos from the store
  const allTodos : Todo[] = useSelector((state: RootState) => state.todos.todos ?? []);
  
  return (
   <>
     <ul id="todo-list">
       {allTodos.map(t => {
         return <li key={t.id} className={t.completed ? 'completed' : ''}>
           <span>{t.name}</span>
           <button>Toggle</button>
         </li>
       })}
     </ul>
   </>
  );
}

export default TodoList;