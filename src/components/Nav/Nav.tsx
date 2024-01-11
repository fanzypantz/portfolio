"use client";

import styles from "./Nav.module.scss";
import Link from "next/link";
import { User } from "@supabase/gotrue-js";

const Nav = ({ user }: { user?: User }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/auth/logout">Logout</Link>
            </li>
            <li>
              <Link href="/auth/profile">Profile {user.email}</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
