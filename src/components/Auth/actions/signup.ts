"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const url = "http://localhost:3000";

export const signup = async (email: string, password: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url}`
    }
  });

  console.log("data : ", data, error);
  if (error) {
    return error;
  }

  redirect("/");
};
