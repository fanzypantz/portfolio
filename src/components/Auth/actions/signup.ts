"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const url = "http://localhost:3000";

export const signup = async (username: string, email: string, password: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const signupResult = await supabase.auth.signUp({
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

  const loginResult = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginResult.error) {
    return { error: { message: loginResult.error.message } };
  }

  const result = await supabase.from("profiles").insert({ id: loginResult.data.user.id, username });

  redirect("/");
};
