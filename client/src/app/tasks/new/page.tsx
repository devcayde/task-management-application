"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import { createTask, FormState } from "@/actions/task.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewTaskPage() {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState,
  );

  return (
    <main className="container mx-auto max-w-2xl px-6 py-10">
      <Button variant="ghost" className="mb-6" render={<Link href="/tasks" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to tasks
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                name="title"
                placeholder="Enter task title"
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
                placeholder="Enter task description"
              />

              {state.errors.description && (
                <p className="text-sm text-red-500">
                  {state.errors.description}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isPending}>
              <Plus data-icon="inline-start" />
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
