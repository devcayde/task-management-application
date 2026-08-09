import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { getTask, updateTask } from "@/actions/task.actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;

  let task;

  try {
    task = await getTask(id);
  } catch {
    notFound();
  }

  async function handleUpdateTask(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;

    const description = formData.get("description") as string;

    const status = formData.get("status") as
      | "ACTIVE"
      | "INACTIVE"
      | "COMPLETED";

    await updateTask(id, {
      title,
      description,
      status,
    });

    redirect(`/tasks/${id}`);
  }

  return (
    <main className="container mx-auto max-w-2xl px-6 py-10">
      <Button variant="ghost" className="mb-6">
        <Link href={`/tasks/${id}`}>← Back</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={handleUpdateTask} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                name="title"
                defaultValue={task.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                name="description"
                defaultValue={task.description ?? ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>

              <select
                id="status"
                name="status"
                defaultValue={task.status}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>

                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
