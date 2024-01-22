import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { LobbyProvider } from "@components/Lobby/LobbyProvider";
import Lobby from "@components/Lobby/Lobby";
import { GameProvider } from "@components/BoardGame/GameProvider";
import Game from "@components/BoardGame/Game";
import { supabaseServerClient } from "@lib/Auth/supabaseServer";

const inter = Inter({ subsets: ["latin"] });

export default async function Home({}) {
  const cookieStore = cookies();
  const result = await supabaseServerClient().from("profiles").select("*");

  return (
    <main className={styles.main}>
      <LobbyProvider>
        <GameProvider>
          <Game />

          <Lobby />
        </GameProvider>
      </LobbyProvider>
    </main>
  );
}
