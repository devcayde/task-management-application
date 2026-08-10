"use client";

import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function TaskSearch() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  return (
    <form action="/tasks" method="GET">
      <Input
        name="search"
        placeholder="Search tasks..."
        defaultValue={search}
        className="max-w-sm"
      />
    </form>
  );
}