// user services

import prisma from "../config/db";
import { hashPassword } from "../utils/hashPassword";

const createUserIntoDB = async (payload: any) => {
  // logic to create user in database
  const hashedPassword = await hashPassword(payload.password);
  // hash password, validate email, etc.
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    },
  });

  return user;
};
// find user by email
const findUserByEmailFromDB = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
// get all users
export const getAllUsersFromDB = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};
// get user by id
export const getUserByIdfromDB = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const userService = {
  createUserIntoDB,
  findUserByEmailFromDB,
  getAllUsersFromDB,
  getUserByIdfromDB,
};
