import toast from 'react-hot-toast'
import type { Todo } from '../types.ts'

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: type === 'success' ? '#4caf50' : '#f44336',
      color: '#fff',
    },
  });
}

export function showUndoToast(todo: Todo, onUndo: (todo: Todo) => void) {
  toast.custom((t) => (
    <div
      className={`bg-red-500 text-white shadow-md rounded-md px-4 py-3 flex items-center gap-3 border border-gray-200 transition duration-300 ${
        t.visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="text-sm">Todo was deleted</span>
      <button
        onClick={() => {
          onUndo(todo);
          toast.dismiss(t.id);
        }}
        className="ml-auto text-red-50 hover:underline text-sm font-medium hover:cursor-pointer"
      >
        Undo
      </button>
    </div>
  ),
  {
    duration: 5000,
    position: 'top-right',
    style: {
      background: '#fff',
      color: '#000',
    },
  });
}