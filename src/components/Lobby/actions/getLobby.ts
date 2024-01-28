"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const getLobbyAction = async (id: number) => {
  const { data, error } = await supabaseServerActionClient()
    .from("lobbies")
    .select(`id,created_at, name, password, lobby_players (player_id, lobby_id)`)
    .eq("id", id)
    .single();

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
