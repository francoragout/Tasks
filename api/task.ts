import { z } from "zod";
import { taskSchema } from "../db/schema";

export async function GetTasks() {
  const response = await fetch("http://localhost:8000/api/tasks", {
    cache: "no-cache",
  });
  return await response.json();
}

export async function CreateTask(values: z.infer<typeof taskSchema>) {
  const response = await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return await response.json();
}

export async function UpdateTask(
  values: z.infer<typeof taskSchema>,
  Id: string
) {
  const response = await fetch(`http://localhost:8000/api/tasks/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return await response.json();
}

export async function DeleteTasks(tasksIds: string[]) {
  const response = await fetch(`http://localhost:8000/api/tasks/${tasksIds}`, {
    method: "DELETE",
  });
  return await response.json();
}
