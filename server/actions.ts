"use server";

import { z } from "zod";
import { taskSchema } from "@/db/schema";
import { db } from "@/db/db";
import { revalidatePath } from "next/cache";

export const CreateTask = async (values: z.infer<typeof taskSchema>) => {
  const validatedFields = taskSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo crear la tarea.",
    };
  }

  const { title, label, status, priority } = values;

  try {
    await db.task.create({
      data: {
        title,
        label,
        status,
        priority,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Tarea creada",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "No se pudo crear la tarea.",
    };
  }
};

export const UpdateTask = async (
  values: z.infer<typeof taskSchema>,
  taskId: string
) => {
  const validatedFields = taskSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo actualizar la tarea.",
    };
  }

  const { title, label, status, priority } = values;

  try {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        label,
        status,
        priority,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Tarea actualizada",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "No se pudo actualizar la tarea.",
    };
  }
};

export const DeleteTasks = async (taskIds: string[]) => {
  try {
    await db.task.deleteMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });

    revalidatePath("/");

    const message = taskIds.length === 1 ? "Tarea eliminada" : "Tareas eliminadas";

    return {
      success: true,
      message: message,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "No se pudieron eliminar las tareas.",
    };
  }
};
