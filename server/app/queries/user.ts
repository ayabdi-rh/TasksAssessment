import prisma from "../../prisma/client";

export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export interface CreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export const createUser = async (data: CreateUser) => {
  return await prisma.user.create({
    data,
  });
};
