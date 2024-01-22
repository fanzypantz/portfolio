"use server";

import { Vector2 } from "@lib/BoardGame/Position";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const movePieceAction = async (game_id: number, from: Vector2, to: Vector2) => {
  const { data, error } = await supabaseServerActionClient()
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

  const { data: pieceData, error: pieceError } = await supabaseServerActionClient()
    .from("pieces")
    .update({ x_coordinate: to.x, y_coordinate: to.y })
    .eq("id", data.id)
    .select()
    .single();

  if (pieceError) {
    console.error(pieceError);
    return {
      error: pieceError.message
    };
  }

  if (!pieceData) {
    return {
      error: "No data returned"
    };
  }

  // TODO save user too
  const { data: moveData, error: moveError } = await supabaseServerActionClient().from("piece_moves").insert({
    start_coordinate_x: from.x,
    start_coordinate_y: from.y,
    end_coordinate_x: to.x,
    end_coordinate_y: to.y,
    piece_id: pieceData.id
  });

  if (moveError) {
    console.error(moveError);
    return {
      error: moveError.message
    };
  }

  return { data: pieceData };
};
