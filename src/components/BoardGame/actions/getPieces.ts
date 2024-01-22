"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const getPiecesAction = async (game_id: number) => {
  const { data, error } = await supabaseServerActionClient().from("pieces").select().eq("game_id", game_id);

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

  return { data: data };
};
