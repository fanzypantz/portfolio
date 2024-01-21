"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@supabase/database.types";
import { cookies } from "next/headers";

export type PieceWithoutIdAndCreatedAt = Omit<Tables<"pieces">, "id" | "created_at">;

export const createPiecesAction = async (game_id: number, pieces: PieceWithoutIdAndCreatedAt[]) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.from("pieces").insert(pieces).select();

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
