"use client";

import { createClientComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

const GoogleButton = () => {
  const signupWithGoogle = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });

    console.log("data : ", data);

    console.log("error : ", error);
  };

  return <button onClick={() => signupWithGoogle()}>Sign Up with Google</button>;
};

export default GoogleButton;
