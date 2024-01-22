"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const closeGameAction = async (game_id: number) => {
  const { data, error } = await supabaseServerActionClient()
    .from("games")
    .update({ end_time: new Date().toISOString(), status: "Closed" })
    .eq("id", game_id)
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
