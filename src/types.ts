export type Todo = {
  id: string;
  name: string;
  completed: boolean;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}
