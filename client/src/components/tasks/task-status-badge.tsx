import { Task } from "@/types/task";

const statusStyles: Record<Task["status"], string> = {
  ACTIVE: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  INACTIVE: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  COMPLETED: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
};

export function TaskStatusBadge({ status }: { status: Task["status"] }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
