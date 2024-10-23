import styles from "./page.module.css";
import { LobbyProvider } from "@components/Lobby/LobbyProvider";
import { GameProvider } from "@components/BoardGame/GameProvider";
import Lobby from "@components/Lobby/Lobby";
import { getLobbyAction } from "@lib/Lobby/actions/getLobby";
import { getLobbyMessagesAction } from "@lib/Lobby/Chat/actions/getLobbyMessages";

export default async function Home() {
  const { error: lobbyError, lobby } = await getLobbyAction();

  if (lobbyError) {
    console.error(lobbyError);
  }

  const { error: messagesError, messages } = await getLobbyMessagesAction();

  if (messagesError) {
    console.error(messagesError);
  }

  console.log("messages", messages);

  return (
    <main className={styles.main}>
      <LobbyProvider loadedLobby={lobby || null} loadedMessages={messages || []}>
        <GameProvider>
          {/*<Game />*/}

          <Lobby />
        </GameProvider>
      </LobbyProvider>
    </main>
  );
}
