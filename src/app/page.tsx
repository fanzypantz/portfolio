import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { LobbyProvider } from "@components/Lobby/LobbyProvider";
import Lobby from "@components/Lobby/Lobby";
import { GameProvider } from "@components/BoardGame/GameProvider";
import Game from "@components/BoardGame/Game";

const inter = Inter({ subsets: ["latin"] });

export default async function Home({}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const result = await supabase.from("profiles").select("*");

  console.log("result : ", result);

  return (
    <main className={styles.main}>
      <LobbyProvider>
        <GameProvider>
          <Lobby />
          <Game />
        </GameProvider>
      </LobbyProvider>
    </main>
  );
}
