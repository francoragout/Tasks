import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { taskSchema } from "@/db/schema";
import { z } from "zod";

type Task = z.infer<typeof taskSchema>;

async function GetTasks() {
  const response = await fetch("http://localhost:8000/api/tasks", {
    cache: "no-cache",
  });
  return await response.json();
}

export default async function Home() {
  const tasks = await GetTasks();
  const data = tasks.map((task: Task) => taskSchema.parse(task));
  return (
    <div className="container mx-auto mt-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
