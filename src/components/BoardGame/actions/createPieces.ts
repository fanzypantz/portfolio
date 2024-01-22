"use server";

import { Database, Tables } from "@supabase/database.types";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export type PieceWithoutIdAndCreatedAt = Omit<Tables<"pieces">, "id" | "created_at">;

export const createPiecesAction = async (game_id: number, pieces: PieceWithoutIdAndCreatedAt[]) => {
  const { data, error } = await supabaseServerActionClient().from("pieces").insert(pieces).select();

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
