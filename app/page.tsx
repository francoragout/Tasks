import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { db } from "@/db/db";
import { taskSchema } from "@/db/schema";
import { z } from "zod";

type Task = z.infer<typeof taskSchema>;

async function getData(): Promise<Task[]> {
  const tasks = await db.task.findMany();
  return tasks.map((task) => taskSchema.parse(task));
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="container mx-auto mt-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
