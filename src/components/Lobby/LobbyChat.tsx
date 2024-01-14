"use client";

import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@supabase/database.types";
import { FormEvent, useContext, useEffect, useState } from "react";
import { RealtimePostgresInsertPayload } from "@supabase/realtime-js";
import { UserContext } from "@components/Auth/UserProvider";
import ChatMessage from "@components/Lobby/ChatMessage";

export interface Message {
  id: number;
  uuid: string;
  message: string | null;
  username: string;
  profile_id: string | null;
  lobby_id: number | null;
}
const LobbyChat = ({ lobby }: { lobby: Tables<"lobbies"> }) => {
  const { profile } = useContext(UserContext);
  const supabase = createClientComponentClient<Database>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    initChat(lobby.id);

    const supabaseChannel = supabase
      .channel(`chat_messages:${lobby.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `lobby_id=eq.${lobby.id}`
        },
        (payload) => handleNewMessage(payload)
      )
      .subscribe();

    return () => {
      supabaseChannel.unsubscribe();
    };
  }, []);

  const initChat = async (lobby_id: number) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select(`*, profiles(username)`)
      .eq("lobby_id", lobby_id)
      .order("id", { ascending: false })
      .limit(10);

    if (error) {
      console.error(error);
      return false;
    }

    const newMessages: Message[] =
      data?.reverse().map((msg) => {
        return {
          id: msg.id,
          uuid: msg.uuid,
          message: msg.message,
          username: msg.profiles?.username ?? "Anonymous",
          profile_id: msg.profile_id,
          lobby_id: msg.lobby_id
        };
      }) ?? [];

    setMessages(newMessages);
  };

  const handleNewMessage = async (payload: RealtimePostgresInsertPayload<{ [p: string]: any }>) => {
    const message = payload.new as Tables<"chat_messages">;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", message.profile_id ?? "")
      .single();

    setMessages((prev) => [
      // Remove message from UI if it exists
      ...prev.filter((msg) => msg.uuid !== message.uuid),
      {
        id: message.id,
        uuid: message.uuid,
        message: message.message,
        username: data?.username ?? "Anonymous",
        profile_id: message.profile_id,
        lobby_id: message.lobby_id
      }
    ]);
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message || message.length === 0) return;
    const uuid = uuidv4();
    const randomInt = Math.floor(Math.random() * 1000000) * -1;

    // Optimistically add message to UI
    setMessages([
      ...messages,
      {
        id: randomInt,
        uuid,
        message,
        username: profile?.username || "Anonymous",
        profile_id: profile?.id ?? null,
        lobby_id: lobby.id
      }
    ]);

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        uuid,
        message,
        profile_id: profile?.id,
        lobby_id: lobby.id
      })
      .select();

    if (error) {
      console.error(error);
      // Revert UI changes if error
      setMessages([...messages.filter((msg) => msg.uuid !== uuid)]);
      return false;
    }

    setMessage("");
  };

  return (
    <div>
      <h1>Lobby Chat</h1>

      <div>
        {messages.map((message) => (
          <ChatMessage key={message.uuid} message={message} />
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
