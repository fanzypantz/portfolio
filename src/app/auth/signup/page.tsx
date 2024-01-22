import styles from "@styles/Auth/Auth.module.scss";
import GoogleButton from "@components/Auth/GoogleButton";
import SignupForm from "@components/Auth/SignupForm";

export default function Page() {
  return (
    <div className={styles.container}>
      <SignupForm />

      <GoogleButton />
    </div>
  );
}
