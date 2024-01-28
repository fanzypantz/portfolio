"use server";

import hashString from "@lib/Auth/hashing";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const createLobbyAction = async (player_id: string, name: string, password: string) => {
  const hashedPassword = await hashString(password);
  const { data, error } = await supabaseServerActionClient()
    .from("lobbies")
    .insert([{ name, password: hashedPassword }])
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

  const { data: pivotData, error: pivotError } = await supabaseServerActionClient()
    .from("lobby_players")
    .insert({
      player_id,
      lobby_id: data[0].id
    })
    .select();

  if (pivotError) {
    console.error(pivotError);
    return {
      error: pivotError.message
    };
  }

  if (!pivotData || pivotData.length === 0) {
    return {
      error: "Could not connect player to lobby"
    };
  }

  return { data: data[0] };
};
