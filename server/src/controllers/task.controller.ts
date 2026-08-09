import { Request, Response } from "express";
import Joi from "joi";
import TaskSvc from "../services/task.service";
import type { TaskStatus } from "../generated/prisma/client";

export default class TaskCtrl {
  static async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const schema = Joi.object({
      title: Joi.string().required().max(255),
      description: Joi.string().allow("").optional(),
    });

    const { error } = schema.validate({ title, description });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TaskSvc.create({ title, description });
      return res.status(201).json({ message: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    const { search, status, page, limit } = req.query;

    const filters: { search?: string; status?: TaskStatus } = {};
    if (search) filters.search = search as string;
    if (status) filters.status = status as TaskStatus;

    const pagination: { page?: number; limit?: number } = {};
    if (page) pagination.page = parseInt(page as string, 10);
    if (limit) pagination.limit = parseInt(limit as string, 10);

    try {
      const result = await TaskSvc.findAll(filters, pagination);
      return res.json({ message: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      const result = await TaskSvc.findById(id);
      if (!result) {
        return res.status(404).json({ message: "Task not found." });
      }
      return res.json({ message: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const id = req.params.id as string;

    const schema = Joi.object({
      title: Joi.string().max(255),
      description: Joi.string().allow(""),
      status: Joi.string().valid("ACTIVE", "INACTIVE", "COMPLETED"),
    });

    const { error } = schema.validate({ title, description, status });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TaskSvc.update(id, { title, description, status });
      return res.json({ message: result });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Task not found." });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async toggleComplete(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      const result = await TaskSvc.toggleComplete(id);
      if (!result) {
        return res.status(404).json({ message: "Task not found." });
      }
      return res.json({ message: result });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Task not found." });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      const result = await TaskSvc.delete(id);
      return res.json({ message: result });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Task not found." });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}