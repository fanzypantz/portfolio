"use client";

import styles from "./Nav.module.scss";
import Link from "next/link";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "@lib/Auth/actions/signOutAction";
import { UserSession } from "@lib/Auth/types";

const Nav = ({ user }: { user?: UserSession | null }) => {
  const router = useRouter();

  const handleSignOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOutAction();
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
              <Link href="/auth/profile">Profile {user?.username || user.email}</Link>
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
