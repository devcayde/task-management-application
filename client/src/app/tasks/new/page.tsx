import { redirect } from "next/navigation";
import Link from "next/link";

import { createTask } from "@/actions/task.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewTaskPage() {
  async function handleCreateTask(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await createTask({
      title,
      description,
    });

    redirect("/tasks");
  }

  return (
    <main className="container mx-auto max-w-2xl px-6 py-10">
      <Button variant="ghost" className="mb-6">
        <Link href="/tasks">← Back to tasks</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={handleCreateTask} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                name="title"
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                name="description"
                placeholder="Enter task description"
              />
            </div>

            <Button type="submit">Create Task</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
