"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

export const createGameAction = async (lobby_id: number, owner_id: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("games")
    .insert([{ lobby_id, owner_id, start_time: new Date().toISOString() }])
    .select();

  if (error) {
    console.error(error);
    return {
      error: error.message
    };
  }

  if (!data || data.length === 0) {
    return {
      error: "No data returned"
    };
  }

  return { data: data[0] };
};
