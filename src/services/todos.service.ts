import { axios } from '../helpers/axios.ts'
import type { Todo } from '../types/types.ts'

export const TodosService  = {

  /**
   * Get all todos from the server.
   */
  async fetchTodos() {
    return axios.get('');
  },

  async createTodo(todo: Todo) {
    await axios.post('', JSON.stringify(todo));
  },

  async getById(id: number) {
    return axios.get('', { params: { id } });
  },

  async deleteTodo(id: number) {
    return axios.delete(`/${id}`);
  }
};