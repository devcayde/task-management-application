export type TaskStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TaskListResponse {
  tasks: Task[];
  pagination: TaskPagination;
}

export interface ApiResponse<T> {
  message: T;
}
