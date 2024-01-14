"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

export const getLobbyAction = async (id: number) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.from("lobbies").select().eq("id", id).single();

  if (error) {
    console.error(error);
    return {
      error: error.message
    };
  }

  if (!data) {
    return {
      error: "No data returned"
    };
  }

  return { data };
};
