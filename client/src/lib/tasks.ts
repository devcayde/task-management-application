import { api } from "@/lib/api";
import { ApiResponse, Task, TaskListResponse, TaskStatus } from "@/types/task";

interface GetTasksOptions {
  status?: TaskStatus;
  page?: number;
  limit?: number;
}

export async function getTasks(
  query?: string,
  options: GetTasksOptions = {},
): Promise<TaskListResponse> {
  const searchParams = new URLSearchParams();

  if (query) {
    searchParams.set("search", query);
  }

  if (options.status) {
    searchParams.set("status", options.status);
  }

  if (options.page) {
    searchParams.set("page", String(options.page));
  }

  if (options.limit) {
    searchParams.set("limit", String(options.limit));
  }

  const queryString = searchParams.toString();

  const response = await api<ApiResponse<TaskListResponse>>(
    `/tasks${queryString ? `?${queryString}` : ""}`,
  );

  return response.message;
}

export async function getTask(id: string): Promise<Task | null> {
  try {
    const response = await api<ApiResponse<Task>>(`/tasks/${id}`);
    return response.message;
  } catch {
    return null;
  }
}

export async function createTask(title: string, description: string) {
  const response = await api<ApiResponse<Task>>("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });

  return response.message;
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
) {
  const response = await api<ApiResponse<Task>>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description, status }),
  });

  return response.message;
}

export async function deleteTask(id: string) {
  const response = await api<ApiResponse<string>>(`/tasks/${id}`, {
    method: "DELETE",
  });

  return response.message;
}

export async function toggleTask(id: string) {
  const response = await api<ApiResponse<Task>>(`/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  return response.message;
}
