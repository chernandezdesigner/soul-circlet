
export type TaskCategory = 'body' | 'mind' | 'soul';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  goal?: number;
  current?: number;
  unit?: string;
  icon?: string;
}

export interface DailyProgress {
  body: number;
  mind: number;
  soul: number;
  overall: number;
}
