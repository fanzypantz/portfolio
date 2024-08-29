"use server";

import { destroySession } from "@lib/Auth/sessions";

export const signOutAction = async () => {
  await destroySession();
};
