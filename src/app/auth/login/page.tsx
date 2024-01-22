import styles from "@styles/Auth/Auth.module.scss";
import GoogleButton from "@components/Auth/GoogleButton";
import LoginForm from "@components/Auth/LoginForm";

export default function Page() {
  return (
    <div className={styles.container}>
      <LoginForm />

      <GoogleButton />
    </div>
  );
}
