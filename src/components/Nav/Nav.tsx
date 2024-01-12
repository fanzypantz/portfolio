"use client";

import styles from "./Nav.module.scss";
import Link from "next/link";
import { User } from "@supabase/gotrue-js";
import { MouseEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Nav = ({ user }: { user?: User }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className={styles.navItem}>
              <a onClick={(e) => handleSignOut(e)}>Logout</a>
            </li>
            <li className={styles.navItem}>
              <Link href="/auth/profile">Profile {user.email}</Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link href="/auth/login">Login</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/auth/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
