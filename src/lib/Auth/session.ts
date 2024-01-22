import "server-only";
import { supabaseServerClient } from "@lib/Auth/supabaseServer";

export const getServerSession = async () => {
  return await supabaseServerClient().auth.getSession();
};

export const getServerUser = async () => {
  const session = await getServerSession();

  return session.data.session?.user;
};
