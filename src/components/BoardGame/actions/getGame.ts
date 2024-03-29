"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const getGameAction = async (id: number) => {
  const { data, error } = await supabaseServerActionClient().from("games").select().eq("id", id).single();

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
