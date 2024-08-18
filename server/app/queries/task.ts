import { TaskStatus } from "@prisma/client";
import prisma from "../../prisma/client";

export interface CreateTask {
  name: string;
  userId: string;
  status?: TaskStatus;
}
export const createTask = async (data: CreateTask) => {
  return await prisma.task.create({
    data,
  });
};

export const getTasks = async (userId: string) => {
  return await prisma.task.findMany({
    where: {
      userId,
    },
  });
};

export const updateTask = async (id: string, data: Partial<CreateTask>) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data,
  });
};
