import { prisma } from "../../prisma/client";
import { RegisterDTO } from "../../types/auth";

// Registration
export async function findUser(username: string) {
  return await prisma.users.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      full_name: true,
      photo_profile: true,
      bio: true,
    },
  });
}

export async function findEmail(email: string) {
  return await prisma.users.findUnique({
    where: { email },
  });
}

export async function adduser({
  username,
  fullname,
  email,
  password,
}: RegisterDTO) {
  return await prisma.users.create({
    data: {
      username,
      full_name: fullname,
      email,
      password,
    },
    select: {
      username: true,
      full_name: true,
      email: true,
    },
  });
}

// Send user data
export async function findUserData(username: string) {
  return await prisma.users.findUnique({
    where: { username },
    select: {
      username: true,
      full_name: true,
      photo_profile: true,
    },
  });
}
