import { z } from "zod";
import { taskSchema } from "../db/schema";




export async function CreateTask(values: z.infer<typeof taskSchema>) {
  const response = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return await response.json();
}
