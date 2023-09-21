import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

const url = "http://localhost:3000";

export default function Page() {
  const login = async (formData: FormData) => {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createRouteHandlerClient<Database>({ cookies });

    await supabase.auth.signInWithPassword({
      email,
      password
    });
  };

  const signup = async (formData: FormData) => {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createRouteHandlerClient<Database>({ cookies });

    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url}/auth/callback`
      }
    });
  };

  return (
    <form action={login}>
      <label htmlFor="email">Email</label>
      <input name="email" defaultValue={"dm@andreas-tollanes.com"} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" defaultValue={"123123"} />
      <button>Sign In</button>
      <button formAction={signup}>Sign Up</button>
    </form>
  );
}
