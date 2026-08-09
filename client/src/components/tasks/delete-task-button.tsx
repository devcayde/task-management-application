"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteTask } from "@/actions/task.actions";
import { Button } from "@/components/ui/button";

interface DeleteTaskButtonProps {
  taskId: string;
}

export function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteTask(taskId);

      router.push("/tasks");
      router.refresh();
    });
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
