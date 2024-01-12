import { Inter } from "next/font/google";
import styles from "./page.module.css";
import ChessGame from "@components/Chess/ChessGame";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({ subsets: ["latin"] });

export default async function Home({}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const result = await supabase.from("profiles").select("*");

  console.log("result : ", result);

  return (
    <main className={styles.main}>
      <ChessGame />
    </main>
  );
}
