import styles from "@styles/Auth/Auth.module.scss";
import GoogleButton from "@components/Auth/GoogleButton";
import LoginForm from "@components/Auth/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.container}>
      <LoginForm />

      <Link href="/auth/signup">Signup</Link>

      <GoogleButton />
    </div>
  );
}
