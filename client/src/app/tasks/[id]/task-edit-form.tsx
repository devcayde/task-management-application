"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";

import { editTask, FormState } from "@/actions/task.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types/task";

export default function EditTaskForm({ task }: { task: Task }) {
  const initialState: FormState = {
    errors: {},
  };

  const editTaskWithId = editTask.bind(null, task.id);

  const [state, formAction, isPending] = useActionState(
    editTaskWithId,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>

        <Input
          id="title"
          name="title"
          defaultValue={task.title}
        />

        {state.errors.title && (
          <p className="text-sm text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          defaultValue={task.description ?? ""}
        />

        {state.errors.description && (
          <p className="text-sm text-red-500">{state.errors.description}</p>
        )}
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

        {state.errors.status && (
          <p className="text-sm text-red-500">{state.errors.status}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        <Save data-icon="inline-start" />
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
