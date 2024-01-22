"use server";

import hashString from "@lib/Auth/hashing";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const createLobbyAction = async (name: string, password: string) => {
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

  return { data: data[0] };
};
