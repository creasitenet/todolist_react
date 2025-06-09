export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface UserData {
  userId: string;
  todos: Todo[];
  lastUpdated: Date;
}

export interface ExportData {
  todos: Todo[];
  exportDate: Date;
  version: string;
}