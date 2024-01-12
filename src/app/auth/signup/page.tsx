import styles from "@styles/Auth/Auth.module.scss";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";
import GoogleButton from "@components/Auth/GoogleButton";
import { redirect } from "next/navigation";
import SignupForm from "@components/Auth/SignupForm";

export default function Page() {
  return (
    <div className={styles.container}>
      <SignupForm />

      <GoogleButton />
    </div>
  );
}
