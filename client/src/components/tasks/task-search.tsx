"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function TaskSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      const query = params.toString();

      router.push(`${pathname}${query ? `?${query}` : ""}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, pathname, router, searchParams]);

  return (
    <Input
      placeholder="Search tasks..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      className="max-w-sm"
    />
  );
}
