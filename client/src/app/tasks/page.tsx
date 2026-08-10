import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { getTasks } from "@/task-db";
import { Button } from "@/components/ui/button";
import { TaskSearch } from "@/components/tasks/task-search";
import { TaskFilter } from "@/components/tasks/task-filter";
import TaskDetail from "./task-detail";

import type { Task, TaskStatus } from "@/types/task";

export type { Task };

interface TasksPageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const params = await searchParams;

  const { query } = params;

  const status =
    params.status === "ACTIVE" ||
    params.status === "INACTIVE" ||
    params.status === "COMPLETED"
      ? (params.status as TaskStatus)
      : undefined;

  const page = params.page ? Number(params.page) : 1;

  const result = await getTasks(query, {
    status,
    page,
    limit: 10,
  });

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks.</p>
        </div>

        <Button render={<Link href="/tasks/new" />}>
          <Plus data-icon="inline-start" />
          Create Task
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Suspense fallback={null}>
          <TaskSearch />
        </Suspense>

        <Suspense fallback={null}>
          <TaskFilter />
        </Suspense>
      </div>

      {result.tasks.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="font-semibold">No tasks found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <TaskDetail tasks={result.tasks} />
      )}

      {result.pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {result.pagination.page} of {result.pagination.totalPages}
          </p>

          <div className="flex gap-2">
            {result.pagination.page > 1 && (
              <PaginationButton
                page={result.pagination.page - 1}
                query={query}
                status={status}
              >
                Previous
              </PaginationButton>
            )}

            {result.pagination.page < result.pagination.totalPages && (
              <PaginationButton
                page={result.pagination.page + 1}
                query={query}
                status={status}
              >
                Next
              </PaginationButton>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function PaginationButton({
  page,
  query,
  status,
  children,
}: {
  page: number;
  query?: string;
  status?: TaskStatus;
  children: React.ReactNode;
}) {
  const params = new URLSearchParams();

  if (query) {
    params.set("query", query);
  }

  if (status) {
    params.set("status", status);
  }

  params.set("page", String(page));

  return (
    <Button variant="outline">
      <Link href={`/tasks?${params.toString()}`}>{children}</Link>
    </Button>
  );
}
