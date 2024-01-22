"use server";

import { compareHash } from "@lib/Auth/hashing";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const joinLobbyAction = async (name: string, password: string) => {
  const { data, error } = await supabaseServerActionClient().from("lobbies").select().eq("name", name).single();

  if (error) {
    console.error(error);
    return {
      error: error.message
    };
  }

  if (!data || data.password === null) {
    return {
      error: "No data returned"
    };
  }

  if (!(await compareHash(password, data.password))) {
    return {
      error: "Incorrect password"
    };
  }

  return { data };
};
