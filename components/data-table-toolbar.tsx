"use client";

import { Table } from "@tanstack/react-table";
import { Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { priorities, statuses } from "@/lib/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import CreateForm from "./create-form";
import { DeleteTasks } from "@/lib/actions";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSomeRowsSelected =
    table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected();

  const handleDelete = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const tasksIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteTasks(tasksIds).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {isSomeRowsSelected && (
          <Button variant="destructive" size={"sm"} onClick={handleDelete}>
            <Trash className="h-4 w-4" />
            Delete Selected
          </Button>
        )}
        <CreateForm />
      </div>
    </div>
  );
}
