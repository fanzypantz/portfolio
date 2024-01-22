"use server";

import { redirect } from "next/navigation";
import { supabaseServerActionClient } from "@lib/Auth/supabaseServerAction";

const url = "http://localhost:3000";

export const signupAction = async (username: string, email: string, password: string) => {
  const signupResult = await supabaseServerActionClient().auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url}`
    }
  });

  if (signupResult.error) {
    return { error: { message: signupResult.error.message } };
  }
  if (!signupResult.data.user?.id) {
    return { error: { message: "Error signing up" } };
  }

  const loginResult = await supabaseServerActionClient().auth.signInWithPassword({
    email,
    password
  });

  if (loginResult.error) {
    return { error: { message: loginResult.error.message } };
  }

  const result = await supabaseServerActionClient().from("profiles").insert({ id: loginResult.data.user.id, username });

  redirect("/");
};
