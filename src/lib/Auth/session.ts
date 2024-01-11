import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

export const getSession = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  return await supabase.auth.getSession();
};

export const getUser = async () => {
  const session = await getSession();

  return session.data.session?.user;
};
