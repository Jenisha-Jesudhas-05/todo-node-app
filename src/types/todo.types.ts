export type TodoStatus = "todo" | "inProgress" | "done" | "pending";

export interface ITodo {
  id: number;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  status: TodoStatus;
  completedPercent: number | null;
  reminded: boolean;
}