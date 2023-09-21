import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { createPagesBrowserClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ChessGame from "@components/Chess/ChessGame";

import { Database } from "@supabase/database.types";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default async function Home({}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const session = await supabase.auth.getSession();
  console.log("supabase : ", session.data);

  return (
    <main className={styles.main}>
      <ChessGame />
    </main>
  );
}
