import prisma from "../utils/prisma";
import type { Prisma, TaskStatus } from "../generated/prisma/client";

export interface TaskFilters {
  search?: string;
  status?: TaskStatus;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export default class TaskRepo {
  static async create(data: Prisma.TaskCreateInput) {
    return prisma.task.create({ data });
  }

  static async findAll(filters: TaskFilters = {}, pagination: PaginationParams = {}) {
    const { search, status } = filters;
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async findById(id: string) {
    return prisma.task.findUnique({ where: { id } });
  }

  static async update(id: string, data: Prisma.TaskUpdateInput) {
    return prisma.task.update({ where: { id }, data });
  }

  static async delete(id: string) {
    await prisma.task.delete({ where: { id } });
    return "Successfully deleted task.";
  }

  static async toggleComplete(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return null;

    const newStatus = task.status === "COMPLETED" ? "ACTIVE" : "COMPLETED";
    return prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });
  }
}