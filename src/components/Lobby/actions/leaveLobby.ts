"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const leaveLobbyAction = async (player_id: string, lobby_id: number) => {
  const { data, error } = await supabaseServerActionClient()
    .from("lobby_players")
    .delete()
    .eq("player_id", player_id)
    .eq("lobby_id", lobby_id)
    .select();

  if (error) {
    console.error(error);
    return {
      error: error.message
    };
  }

  return { data };
};
