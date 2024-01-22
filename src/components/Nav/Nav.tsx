"use client";

import styles from "./Nav.module.scss";
import Link from "next/link";
import { User } from "@supabase/gotrue-js";
import { MouseEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@lib/Auth/supabase";
import { UserContext } from "@components/Auth/UserProvider";

const Nav = ({ user }: { user?: User }) => {
  const { profile } = useContext(UserContext);
  const router = useRouter();

  const handleSignOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await supabaseBrowserClient.auth.signOut();
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
              <Link href="/auth/profile">Profile {profile?.username || user.email}</Link>
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
