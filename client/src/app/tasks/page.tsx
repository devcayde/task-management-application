import Link from "next/link";

import { getTasks } from "@/actions/task.actions";
import { Button } from "@/components/ui/button";

import { TaskCard } from "@/components/tasks/task-card";
import { TaskSearch } from "@/components/tasks/task-search";
import { TaskFilter } from "@/components/tasks/task-filter";

import type { TaskStatus } from "@/types/task";

interface TasksPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const params = await searchParams;

  const search = params.search;

  const status =
    params.status === "ACTIVE" ||
    params.status === "INACTIVE" ||
    params.status === "COMPLETED"
      ? (params.status as TaskStatus)
      : undefined;

  const page = params.page ? Number(params.page) : 1;

  const result = await getTasks({
    search,
    status,
    page,
    limit: 10,
  });

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="text-muted-foreground">Manage your tasks.</p>
        </div>

        <Button>
          <Link href="/tasks/new">Create Task</Link>
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <TaskSearch />

        <TaskFilter />
      </div>

      {/* Results */}
      {result.tasks.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="font-semibold">No tasks found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {result.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {result.pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {result.pagination.page} of {result.pagination.totalPages}
          </p>

          <div className="flex gap-2">
            {result.pagination.page > 1 && (
              <PaginationButton page={result.pagination.page - 1}>
                Previous
              </PaginationButton>
            )}

            {result.pagination.page < result.pagination.totalPages && (
              <PaginationButton page={result.pagination.page + 1}>
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
  children,
}: {
  page: number;
  children: React.ReactNode;
}) {
  return (
    <Button variant="outline">
      <Link
        href={{
          pathname: "/tasks",
          query: {
            search: undefined,
            status: undefined,
            page,
          },
        }}
      >
        {children}
      </Link>
    </Button>
  );
}
