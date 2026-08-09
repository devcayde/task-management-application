import TaskRepo from "../repositories/task.repository";
import type { TaskStatus } from "../generated/prisma/client";

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskFilters {
  search?: string;
  status?: TaskStatus;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export default class TaskSvc {
  static async create(input: CreateTaskInput) {
    return TaskRepo.create(input);
  }

  static async findAll(filters: TaskFilters = {}, pagination: PaginationParams = {}) {
    return TaskRepo.findAll(filters, pagination);
  }

  static async findById(id: string) {
    return TaskRepo.findById(id);
  }

  static async update(id: string, input: UpdateTaskInput) {
    return TaskRepo.update(id, input);
  }

  static async delete(id: string) {
    return TaskRepo.delete(id);
  }

  static async toggleComplete(id: string) {
    return TaskRepo.toggleComplete(id);
  }
}