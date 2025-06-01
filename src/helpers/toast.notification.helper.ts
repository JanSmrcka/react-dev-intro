import toast from 'react-hot-toast'

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