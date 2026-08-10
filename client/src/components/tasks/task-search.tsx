"use client";

import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function TaskSearch() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const status = searchParams.get("status");

  return (
    <form action="/tasks" method="GET" className="flex gap-2">
      <Input
        name="query"
        placeholder="Search tasks..."
        defaultValue={query}
        className="max-w-sm"
      />

      {status && <input type="hidden" name="status" value={status} />}
    </form>
  );
}
