"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";
import { Vector2 } from "@lib/BoardGame/Position";

export const movePieceAction = async (game_id: number, from: Vector2, to: Vector2) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("pieces")
    .select()
    .eq("game_id", game_id)
    .eq("x_coordinate", from.x)
    .eq("y_coordinate", from.y)
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

  const { data: moveData, error: moveError } = await supabase
    .from("pieces")
    .update({ x_coordinate: to.x, y_coordinate: to.y })
    .eq("id", data.id)
    .single();

  if (moveError) {
    console.error(moveError);
    return {
      error: moveError.message
    };
  }

  if (!moveData) {
    return {
      error: "No data returned"
    };
  }

  return { data: moveData };
};
