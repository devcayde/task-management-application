import { Button } from "@/components/ui/button";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TaskResponse = {
  message: {
    tasks: Task[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export default async function Home() {
  const response = await fetch("http://localhost:3002/api/tasks");
  const data: TaskResponse = await response.json();
  const tasks = data.message.tasks;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button>
        <Link href="/tasks">Open Tasks</Link>
      </Button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
