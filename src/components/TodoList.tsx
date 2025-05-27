import { useTodoStore } from '../store/todo.store.ts'

function TodoList() {
  // Retrieve the todos from the store
  const todos = useTodoStore(state => state.todos);
  
  return (
   <>
     <ul id="todo-list">
       {todos.map(t => {
         return <li key={t.id} className={t.completed ? 'completed' : ''}>
           <span>{t.text}</span>
           <button onClick={() => useTodoStore.getState().toggleTodo(t.id)}>Toggle</button>
         </li>
       })}
     </ul>
   </>
  );
}

export default TodoList;