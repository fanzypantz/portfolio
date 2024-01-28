"use server";

import { compareHash } from "@lib/Auth/hashing";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const joinLobbyAction = async (player_id: string, name: string, password: string) => {
  const { data, error } = await supabaseServerActionClient()
    .from("lobbies")
    .select(`id,created_at, name, password, lobby_players (player_id, lobby_id)`)
    .eq("name", name)
    .single();

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

  if (data.lobby_players.length >= 2) {
    return {
      error: "Lobby is full"
    };
  }

  if (!(await compareHash(password, data.password))) {
    return {
      error: "Incorrect password"
    };
  }

  const { data: pivotData, error: pivotError } = await supabaseServerActionClient()
    .from("lobby_players")
    .insert({
      player_id,
      lobby_id: data.id
    })
    .select();

  if (pivotError) {
    console.error(pivotError);
    return {
      error: "Could not connect player to lobby"
    };
  }

  if (!pivotData || pivotData.length === 0) {
    return {
      error: "Could not connect player to lobby"
    };
  }

  return { data };
};
