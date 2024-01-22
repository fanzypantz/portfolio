"use server";

import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const getUserProfileAction = async (user_id: string) => {
  const { data, error } = await supabaseServerActionClient().from("profiles").select("*").eq("id", user_id).single();

  if (error) {
    return { error };
  }

  return { data };
};
