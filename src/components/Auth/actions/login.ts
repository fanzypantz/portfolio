"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  console.log("data : ", data, error);
  if (error) {
    return error;
  }

  redirect("/");
};
