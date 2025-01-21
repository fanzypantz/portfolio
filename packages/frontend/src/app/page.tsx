import styles from "./page.module.css";
import Lobby from "@components/Lobby/Lobby";
import { getLobbyAction } from "@lib/Lobby/actions/getLobby";
import { getLobbyMessagesAction } from "@lib/Lobby/Chat/actions/getLobbyMessages";
import ClientLobbyInitializer from "@components/Lobby/ClientLobbyInitializer";
import { ChatMessageType, LobbyType } from "@lib/Constants/types";
import { getSessionPayload } from "@lib/Auth/sessions";
import { getLobbyIdCookie } from "@lib/Lobby/lobbyStorage";

export default async function Home() {
  let lobby: LobbyType | undefined;
  let messages: ChatMessageType[] | undefined;

  const user = await getSessionPayload();
  const lobbyId = await getLobbyIdCookie();
  if (user && lobbyId) {
    const { error: lobbyError, lobby: lobbyData } = await getLobbyAction(lobbyId);

    if (lobbyError) {
      console.error(lobbyError);
    }

    const { error: messagesError, messages: messagesData } = await getLobbyMessagesAction(lobbyId);

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

      {/*<Game />*/}
    </main>
  );
}
