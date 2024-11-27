"use client";

import { Row } from "@tanstack/react-table";
import { taskSchema } from "@/lib/schema";
import EditForm from "./edit-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

  return <EditForm task={task} />;
}
