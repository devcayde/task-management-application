"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toggleTask } from "@/actions/task.actions";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/types/task";

interface ToggleTaskButtonProps {
  taskId: string;
  status: TaskStatus;
}

export function ToggleTaskButton({ taskId, status }: ToggleTaskButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleTask(taskId);

      router.refresh();
    });
  }

  const isCompleted = status === "COMPLETED";

  return (
    <Button
      variant={isCompleted ? "outline" : "secondary"}
      onClick={handleToggle}
      disabled={isPending}
    >
      {isPending ? "Updating..." : isCompleted ? "Mark Active" : "Complete"}
    </Button>
  );
}
