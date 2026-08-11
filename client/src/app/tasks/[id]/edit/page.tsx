import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getTask } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import EditTaskForm from "../task-edit-form";

interface EditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;

  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-2xl px-6 py-10">
      <Button variant="ghost" className="mb-6" render={<Link href="/tasks" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to tasks
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
        </CardHeader>

        <CardContent>
          <EditTaskForm task={task} />
        </CardContent>
      </Card>
    </main>
  );
}
