export type Todo = {
  id: number | null;
  name: string;
  description: string | null;
  completed: boolean;
  priority: number | null;
  createdAt: Date;
  updatedAt: Date;
}
