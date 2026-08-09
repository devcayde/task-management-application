import { notFound } from "next/navigation";
import Link from "next/link";


import { getTask } from "@/actions/task.actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ToggleTaskButton } from "@/components/tasks/toggle-task-button";
import { DeleteTaskButton } from "@/components/tasks/delete-task-button";

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

  return (
    <main className="container mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <Button variant="ghost">
          <Link href="/tasks">← Back to tasks</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-2xl">{task.title}</CardTitle>

            <span className="rounded-full bg-muted px-3 py-1 text-sm">
              {task.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-1 text-sm font-medium">Description</h3>

            <p className="text-muted-foreground">
              {task.description || "No description"}
            </p>
          </div>

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

          <div className="flex gap-3">
            <Button>
              <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
            </Button>

            <ToggleTaskButton taskId={task.id} status={task.status} />

            <DeleteTaskButton taskId={task.id} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
