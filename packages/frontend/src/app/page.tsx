import styles from "./page.module.css";
import Lobby from "@components/Lobby/Lobby";
import ClientLobbyInitializer from "@components/Lobby/ClientLobbyInitializer";
import { getSessionPayload } from "@lib/Auth/sessions";
import { getLobbyIdCookie } from "@lib/Lobby/lobbyStorage";
import { getLobby } from "@lib/Lobby/getters/getLobby";
import { getLobbyMessages } from "@lib/Lobby/Chat/getters/getLobbyMessages";
import { ChatMessageType } from "@lib/Lobby/Chat/types";
import { LobbyType } from "@lib/Lobby/types";
import Game from "@components/BoardGame/Game";

export default async function Home() {
  let lobby: LobbyType | undefined;
  let messages: ChatMessageType[] | undefined;

  const user = await getSessionPayload();
  const lobbyId = await getLobbyIdCookie();
  if (user && lobbyId) {
    const { error: lobbyError, lobby: lobbyData } = await getLobby(lobbyId);

    if (lobbyError) {
      console.error(lobbyError);
    }

    const { error: messagesError, messages: messagesData } = await getLobbyMessages(lobbyId);

    if (messagesError) {
      console.error(messagesError);
    }

    lobby = lobbyData;
    messages = messagesData;
  }

  return (
    <main className={styles.main}>
      {user && <ClientLobbyInitializer loadedLobby={lobby || null} loadedMessages={messages || null} />}
      {user && <Lobby />}

      <Game />
    </main>
  );
}
