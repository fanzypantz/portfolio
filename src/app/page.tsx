import styles from "./page.module.css";
import { LobbyProvider } from "@components/Lobby/LobbyProvider";
import { GameProvider } from "@components/BoardGame/GameProvider";
import Lobby from "@components/Lobby/Lobby";
import { getLobbyAction } from "@lib/Lobby/actions/getLobby";

export default async function Home({}) {
  const { error, lobby } = await getLobbyAction();

  if (error) {
    console.error(error);
  }

  return (
    <main className={styles.main}>
      <LobbyProvider loadedLobby={lobby || null}>
        <GameProvider>
          {/*<Game />*/}

          <Lobby />
        </GameProvider>
      </LobbyProvider>
    </main>
  );
}
