"use client";

import { v4 as uuidv4 } from "uuid";
import { FormEvent, useContext, useEffect, useState } from "react";
import ChatMessage from "@components/Lobby/ChatMessage";
import { LobbyContext } from "@components/Lobby/LobbyProvider";

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
  const { messages } = useContext(LobbyContext);

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

    if (!message || message.length === 0) return;
    const uuid = uuidv4();
    const randomInt = Math.floor(Math.random() * 1000000) * -1;

    // // Optimistically add message to UI
    // setMessages([
    //   ...messages,
    //   {
    //     id: randomInt,
    //     uuid,
    //     message,
    //     username: profile?.username || "Anonymous",
    //     profile_id: profile?.id ?? null,
    //     lobby_id: lobby.id
    //   }
    // ]);
    //
    // const { data, error } = await supabaseBrowserClient
    //   .from("chat_messages")
    //   .insert({
    //     uuid,
    //     message,
    //     profile_id: profile?.id,
    //     lobby_id: lobby.id
    //   })
    //   .select();
    //
    // if (error) {
    //   console.error(error);
    //   // Revert UI changes if error
    //   setMessages([...messages.filter((msg) => msg.uuid !== uuid)]);
    //   return false;
    // }

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
