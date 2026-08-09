"use server";

import { api } from "@/lib/api";
import { ApiResponse, Task, TaskListResponse, TaskStatus } from "@/types/task";

interface GetTasksParams {
  search?: string;
  status?: TaskStatus;
  page?: number;
  limit?: number;
}

interface CreateTaskInput {
  title: string;
  description?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export async function getTasks(
  params: GetTasksParams = {},
): Promise<TaskListResponse> {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  const query = searchParams.toString();

  const response = await api<ApiResponse<TaskListResponse>>(
    `/tasks${query ? `?${query}` : ""}`,
  );

  return response.message;
}

export async function getTask(id: string): Promise<Task> {
  const response = await api<ApiResponse<Task>>(`/tasks/${id}`);

  return response.message;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await api<ApiResponse<Task>>("/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return response.message;
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput,
): Promise<Task> {
  const response = await api<ApiResponse<Task>>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  return response.message;
}

export async function toggleTask(id: string): Promise<Task> {
  const response = await api<ApiResponse<Task>>(`/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  return response.message;
}

export async function deleteTask(id: string): Promise<string> {
  const response = await api<ApiResponse<string>>(`/tasks/${id}`, {
    method: "DELETE",
  });

  return response.message;
}
