"use client";

import { supabaseBrowserClient } from "@lib/Auth/supabase";

const GoogleButton = () => {
  const signupWithGoogle = async () => {
    const { data, error } = await supabaseBrowserClient.auth.signInWithOAuth({ provider: "google" });

    console.log("data : ", data);

    console.log("error : ", error);
  };

  return <button onClick={() => signupWithGoogle()}>Sign Up with Google</button>;
};

export default GoogleButton;
