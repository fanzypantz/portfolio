import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { LobbyProvider } from "@components/Lobby/LobbyProvider";
import { GameProvider } from "@components/BoardGame/GameProvider";
import Game from "@components/BoardGame/Game";
import Lobby from "@components/Lobby/Lobby";

const inter = Inter({ subsets: ["latin"] });

export default async function Home({}) {
  return (
    <main className={styles.main}>
      <LobbyProvider>
        <GameProvider>
          {/*<Game />*/}

          <Lobby />
        </GameProvider>
      </LobbyProvider>
    </main>
  );
}
