"use client";

import { deleteTask, toggleTask } from "@/actions/task.actions";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useOptimistic } from "react";

import { Task } from "@/types/task";

type OptimisticAction =
  | { type: "remove"; taskId: string }
  | { type: "toggle"; taskId: string };

export default function TaskDetail({ tasks }: { tasks: Task[] }) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (currentTasks, action: OptimisticAction) => {
      if (action.type === "remove") {
        return currentTasks.filter((task) => task.id !== action.taskId);
      }

      return currentTasks.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              status: task.status === "COMPLETED" ? "ACTIVE" : "COMPLETED",
            }
          : task,
      );
    },
  );

  const deleteTaskById = async (taskId: string) => {
    setOptimisticTasks({ type: "remove", taskId });
    await deleteTask(taskId);
  };

  const toggleTaskById = async (taskId: string) => {
    setOptimisticTasks({ type: "toggle", taskId });
    await toggleTask(taskId);
  };

  return (
    <ul className="grid gap-4">
      {optimisticTasks.map((task) => {
        const isCompleted = task.status === "COMPLETED";

        return (
          <li
            key={task.id}
            className="rounded-lg border bg-card p-4 shadow-sm transition hover:bg-muted/50"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold leading-snug">
                <Link
                  href={`/tasks/${task.id}`}
                  className="hover:underline"
                >
                  {task.title}
                </Link>
              </h2>
              <TaskStatusBadge status={task.status} />
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {task.description || "No description"}
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" render={<Link href={`/tasks/${task.id}/edit`} />}>
                  <Pencil data-icon="inline-start" />
                  Edit
                </Button>

                <Form action={toggleTaskById.bind(null, task.id)}>
                  <Button
                    type="submit"
                    size="sm"
                    variant={isCompleted ? "outline" : "secondary"}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw data-icon="inline-start" />
                        Mark Active
                      </>
                    ) : (
                      <>
                        <CheckCircle2 data-icon="inline-start" />
                        Complete
                      </>
                    )}
                  </Button>
                </Form>
              </div>

              <Form action={deleteTaskById.bind(null, task.id)}>
                <Button type="submit" size="sm" variant="destructive">
                  <Trash2 data-icon="inline-start" />
                  Delete
                </Button>
              </Form>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
