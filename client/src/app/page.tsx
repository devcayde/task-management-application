import { Button } from "@/components/ui/button";
import { getTasks } from "@/task-db";
import Link from "next/link";

export default async function Home() {
  const { tasks } = await getTasks();

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
