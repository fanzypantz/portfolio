import "server-only";
import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";

export const getUser = async (userId: string) => {
  const userSession = await getSessionPayload();

  if (!userSession) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    return null;
  }

  user.password = null;

  return user;
};
