"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const createGameAction = async (lobby_id: number, owner_id: string) => {
  const { data, error } = await supabaseServerActionClient()
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
