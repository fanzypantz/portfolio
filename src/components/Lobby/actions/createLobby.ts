"use server";

import hashString from "@lib/Auth/hashing";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

export const createLobbyAction = async (name: string, password: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const hashedPassword = await hashString(password);
  const { data, error } = await supabase
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
