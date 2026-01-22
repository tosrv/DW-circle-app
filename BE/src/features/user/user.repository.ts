import { prisma } from "../../prisma/client";

export async function findUsers(id: number) {
  return await prisma.users.findMany({
    take: 5,
    select: {
      id: true,
      username: true,
      full_name: true,
      photo_profile: true,
    },
    where: {
      id: {
        not: id,
      },
    },
  });
}
