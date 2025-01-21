"use client";

import { FormEvent, useState } from "react";
import styles from "@components/Lobby/Lobby.module.scss";
import { useLobbyStore } from "@lib/Lobby/stores/lobbyStore";

const JoinLobbyForm = () => {
  const { joinLobby } = useLobbyStore();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateLobby = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    joinLobby(name, password);
  };

  return (
    <form className={"form " + styles.form} onSubmit={(e) => handleCreateLobby(e)}>
      <div className="formGroup">
        <label htmlFor="name">Name</label>
        <input name="name" placeholder={"enter a lobby name"} value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder={"********"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn">
        Join Lobby
      </button>
    </form>
  );
};

export default JoinLobbyForm;
