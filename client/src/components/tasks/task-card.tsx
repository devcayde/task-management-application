import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{task.title}</h2>

            <TaskStatusBadge status={task.status} />
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {task.description || "No description"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function TaskStatusBadge({ status }: { status: Task["status"] }) {
  const styles = {
    ACTIVE: "bg-blue-100 text-blue-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
