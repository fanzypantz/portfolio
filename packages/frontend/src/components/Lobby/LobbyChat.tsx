"use client";

import { v4 as uuidv4 } from "uuid";
import { FormEvent, useContext, useEffect, useState } from "react";
import ChatMessage from "@components/Lobby/ChatMessage";
import { useLobbyStore } from "@lib/Lobby/stores/lobbyStore";
import { UserContext } from "@components/Auth/UserProvider";
import { sendMessageAction } from "@lib/Lobby/Chat/actions/sendMessageAction";
import { ChatMessageType } from "@lib/Lobby/Chat/types";

export interface Message {
  id: number;
  uuid: string;
  message: string | null;
  username: string;
  profileId: string | null;
  lobbyId: number | null;
}

// TODO move to server actions

const LobbyChat = () => {
  const { user } = useContext(UserContext);
  const { currentLobby, messages, addMessage, removeMessage } = useLobbyStore();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // const supabaseChannel = supabaseBrowserClient
    //   .channel(`lobby:${lobby.id}`)
    //   .on(
    //     "postgres_changes",
    //     {
    //       event: "INSERT",
    //       schema: "public",
    //       table: "chat_messages",
    //       filter: `lobby_id=eq.${lobby.id}`
    //     },
    //     (payload) => handleNewMessage(payload)
    //   )
    //   .subscribe();
    //
    // return () => {
    //   supabaseChannel.unsubscribe();
    // };
  }, []);

  // const handleNewMessage = async (payload: RealtimePostgresInsertPayload<{ [p: string]: any }>) => {
  //   const message = payload.new as Tables<"chat_messages">;
  //   const { data, error } = await getUserProfileAction(message.profile_id ?? "");
  //
  //   setMessages((prev) => [
  //     // Remove message from UI if it exists
  //     ...prev.filter((msg) => msg.uuid !== message.uuid),
  //     {
  //       id: message.id,
  //       uuid: message.uuid,
  //       message: message.message,
  //       username: data?.username ?? "Anonymous",
  //       profile_id: message.profile_id,
  //       lobby_id: message.lobby_id
  //     }
  //   ]);
  // };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !message || message.length === 0 || !currentLobby) return;
    const uuid = uuidv4();

    // // Optimistically add message to UI
    const newMessage: ChatMessageType = {
      id: uuid,
      message,
      createdAt: new Date(),
      user: {
        id: user.id,
        username: user.username
      }
    };
    addMessage(newMessage);

    const result = await sendMessageAction(currentLobby.id, newMessage);

    if (result.error) {
      console.error(result.error);
      // Revert UI changes if error
      removeMessage(newMessage);
      return;
    }

    setMessage("");
  };

  return (
    <div>
      <h1>Lobby Chat</h1>

      <div>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        <form className="form" onSubmit={(e) => sendMessage(e)}>
          <div className="formGroup">
            <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default LobbyChat;
