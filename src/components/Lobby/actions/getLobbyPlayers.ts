"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const getLobbyPlayersAction = async (lobby_id: number) => {
  const { data, error } = await supabaseServerActionClient()
    .from("lobby_players")
    .select(`player_id, profiles (id, username)`)
    .eq("lobby_id", lobby_id);

  if (error) {
    console.error(error);
    return {
      error: error.message
    };
  }

  const profiles = data.map((d: any) => d.profiles);

  return { data: profiles };
};
