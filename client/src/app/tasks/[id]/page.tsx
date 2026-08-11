import Link from "next/link";
import { notFound } from "next/navigation";
import Form from "next/form";
import {
  ArrowLeft,
  CheckCircle2,
  Pencil,
  RotateCcw,
} from "lucide-react";

import { toggleTask } from "@/actions/task.actions";
import { TaskStatusBadge } from "@/components/tasks/task-status-badge";
import { getTask } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = await params;

  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  const toggleTaskById = toggleTask.bind(null, task.id);
  const isCompleted = task.status === "COMPLETED";

  return (
    <main className="container mx-auto max-w-3xl px-6 py-10">
      <Button variant="ghost" className="mb-6" render={<Link href="/tasks" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to tasks
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl leading-snug">{task.title}</CardTitle>
            <TaskStatusBadge status={task.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-1 text-sm font-medium">Description</h3>
            <p className="text-muted-foreground">
              {task.description || "No description"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-1 text-sm font-medium">Created</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Last updated</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t pt-4">
            <Button render={<Link href={`/tasks/${task.id}/edit`} />}>
              <Pencil data-icon="inline-start" />
              Edit
            </Button>

            <Form action={toggleTaskById}>
              <Button
                type="submit"
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
                    Mark Complete
                  </>
                )}
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
