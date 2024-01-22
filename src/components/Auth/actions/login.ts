"use server";

import { redirect } from "next/navigation";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

export const loginAction = async (email: string, password: string) => {
  const { data, error } = await supabaseServerActionClient().auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
};
