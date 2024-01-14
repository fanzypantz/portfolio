"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";
import { compareHash } from "@lib/Auth/hashing";

export const joinLobbyAction = async (name: string, password: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.from("lobbies").select().eq("name", name).single();

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
