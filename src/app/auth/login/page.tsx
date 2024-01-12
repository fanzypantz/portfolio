import styles from "@styles/Auth/Auth.module.scss";
import GoogleButton from "@components/Auth/GoogleButton";
import LoginForm from "@components/Auth/LoginForm";

const url = "http://localhost:3000";

export default function Page() {
  return (
    <div className={styles.container}>
      <LoginForm />

      <GoogleButton />
    </div>
  );
}
