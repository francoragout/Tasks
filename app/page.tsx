import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { taskSchema, userSchema } from "@/db/schema";
import { z } from "zod";

type Task = z.infer<typeof taskSchema>;
type User = z.infer<typeof userSchema>;

async function GetTasks() {
  const response = await fetch("http://localhost:8000/api/tasks", {
    cache: "no-cache",
  });
  return await response.json();
}

async function GetUsers() {
  const response = await fetch("http://localhost:5000/api/users", {
    cache: "no-cache",
  });
  return await response.json();
}

export default async function Home() {
  const tasks = await GetTasks();
  const data = tasks.map((task: Task) => taskSchema.parse(task));
  const users = await GetUsers();
  const usersData = users.map((user: User) => userSchema.parse(user));

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold">This is a task table for {usersData}</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
