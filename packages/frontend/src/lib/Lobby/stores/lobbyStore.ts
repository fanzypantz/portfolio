import { create } from "zustand";
import { createLobbyAction } from "@lib/Lobby/actions/createLobby";
import { joinLobbyAction } from "@lib/Lobby/actions/joinLobby";
import { leaveLobbyAction } from "@lib/Lobby/actions/leaveLobby";
import { getGameAction } from "@lib/BoardGame/getters/getGame";
import { createGameAction } from "@lib/BoardGame/actions/createGame";
import { closeGameAction } from "@lib/BoardGame/actions/closeGame";
import { Lobby, User, Game, GamePiece } from "@prisma/client";
import { JoinStatus, LobbyStatus } from "@lib/Lobby/enums";
import { GameTypes } from "@lib/BoardGame/enums";
import { ChatMessageType } from "@lib/Lobby/Chat/types";
import { LobbyType } from "@lib/Lobby/types";

interface LobbyStore {
  // Lobby State
  currentLobby: Lobby | null;
  players: User[];
  joinStatus: JoinStatus;
  lobbyStatus: LobbyStatus;
  setJoinStatus: (status: JoinStatus) => void;
  setLobbyStatus: (status: LobbyStatus) => void;
  setCurrentLobby: (lobby: Lobby | null) => void;
  setPlayers: (players: User[]) => void;
  initializeLobby: (lobby: LobbyType | null, messages: ChatMessageType[]) => void;
  createLobby: (name: string, password: string) => Promise<boolean>;
  joinLobby: (name: string, password: string) => Promise<boolean>;
  leaveLobby: () => Promise<void>;

  // Message State
  messages: ChatMessageType[];
  setMessages: (messages: ChatMessageType[]) => void;
  addMessage: (message: ChatMessageType) => void;
  removeMessage: (message: ChatMessageType) => void;

  // Game State
  currentGame: Game | null;
  currentGameType: GameTypes | null;
  currentPieces: GamePiece[] | null;
  setCurrentGame: (game: Game | null) => void;
  setCurrentPieces: (pieces: GamePiece[] | null) => void;
  createGame: () => Promise<void>;
  fetchGame: (gameId: string) => Promise<void>;
  closeGame: () => Promise<void>;
}

export const useLobbyStore = create<LobbyStore>((set, get) => ({
  ////////////////////////////////////////////////////////////////////////////////////
  // Lobby State
  ////////////////////////////////////////////////////////////////////////////////////
  currentLobby: null,
  players: [],
  joinStatus: JoinStatus.None,
  lobbyStatus: LobbyStatus.None,

  setJoinStatus: (status) => set({ joinStatus: status }),

  setLobbyStatus: (status) => set({ lobbyStatus: status }),

  setCurrentLobby: (lobby) => set({ currentLobby: lobby }),

  setPlayers: (players) => set({ players }),

  initializeLobby: (lobby, messages) =>
    set({
      currentLobby: lobby,
      players: lobby?.lobbyMembers.map((member) => member.user) || [],
      messages
    }),

  createLobby: async (name, password) => {
    set({ joinStatus: JoinStatus.Creating });
    const { error, lobby } = await createLobbyAction(name, password);
    if (error || !lobby) {
      console.error(error || "Lobby creation failed");
      set({ joinStatus: JoinStatus.Failed });
      return false;
    }
    set({
      currentLobby: lobby,
      players: lobby.lobbyMembers.map((member) => member.user),
      joinStatus: JoinStatus.Joined
    });

    // Set cookie to lobbyId
    return true;
  },

  joinLobby: async (name, password) => {
    set({ joinStatus: JoinStatus.Joining });
    const lobby = await joinLobbyAction(name, password);
    if (!lobby) {
      console.error("Lobby not joined");
      set({ joinStatus: JoinStatus.Failed });
      return false;
    }
    set({
      currentLobby: lobby,
      players: lobby.lobbyMembers.map((member) => member.user),
      joinStatus: JoinStatus.Joined
    });

    return true;
  },

  leaveLobby: async () => {
    set({ joinStatus: JoinStatus.Leaving });
    const result = await leaveLobbyAction();
    if (!result) {
      console.error("Lobby not left");
      set({ joinStatus: JoinStatus.Failed });
      return;
    }
    set({
      currentLobby: null,
      players: [],
      joinStatus: JoinStatus.None
    });
  },

  ////////////////////////////////////////////////////////////////////////////////////
  // Message State
  ////////////////////////////////////////////////////////////////////////////////////
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => {
    const oldMessages = get().messages;
    set({ messages: [...oldMessages, message] });
  },
  removeMessage: (message) => {
    const oldMessages = get().messages;
    set({ messages: oldMessages.filter((msg) => msg.id !== message.id) });
  },

  ////////////////////////////////////////////////////////////////////////////////////
  // Game State
  ////////////////////////////////////////////////////////////////////////////////////
  currentGame: null,
  currentGameType: null,
  currentPieces: null,

  setCurrentGame: (game) => set({ currentGame: game }),

  setCurrentPieces: (pieces) => set({ currentPieces: pieces }),

  createGame: async () => {
    const { currentLobby } = get();
    if (!currentLobby) {
      console.error("No current lobby available");
      return;
    }
    const data = await createGameAction(currentLobby.id);

    set({ currentGame: data });
  },

  fetchGame: async (gameId) => {
    const data = await getGameAction(gameId);
    if (data) {
      console.error("Game not found");
      return;
    }
    set({ currentGame: data });
  },

  closeGame: async () => {
    const { currentGame } = get();
    if (!currentGame) return;

    const data = await closeGameAction(currentGame.id);
    if (!data) {
      console.error("Game not found");
      return;
    }
    set({ currentGame: null, currentPieces: null });
  }
}));
