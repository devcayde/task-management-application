"use server";

import * as tasks from "@/lib/tasks";
import { TaskStatus } from "@/types/task";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  description?: string;
  status?: string;
};

export type FormState = {
  errors: Errors;
};

export async function createTask(prevState: FormState, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const errors: Errors = {};

  if (!title?.trim()) {
    errors.title = "Title is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await tasks.createTask(title, description ?? "");

  redirect("/tasks");
}

export async function editTask(
  id: string,
  prevState: FormState,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as TaskStatus;

  const errors: Errors = {};

  if (!title?.trim()) {
    errors.title = "Title is required";
  }

  if (!status) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await tasks.updateTask(id, title, description ?? "", status);

  redirect("/tasks");
}

export async function deleteTask(id: string) {
  await tasks.deleteTask(id);
  revalidatePath("/tasks");
}

export async function toggleTask(id: string) {
  await tasks.toggleTask(id);
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${id}`);
}
