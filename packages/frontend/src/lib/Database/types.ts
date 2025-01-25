import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { GameStatus, GameTypes, Role } from "./enums";

export type ChatMessage = {
    id: string;
    userId: string;
    lobbyId: string;
    message: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Game = {
    id: string;
    type: GameTypes;
    startedAt: Timestamp | null;
    finishedAt: Timestamp | null;
    status: Generated<GameStatus>;
    lobbyId: string | null;
    ownerId: string;
    winnerId: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type GameMove = {
    id: Generated<number>;
    pieceId: number;
    userId: string;
    xStart: number;
    yStart: number;
    xEnd: number;
    yEnd: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type GamePiece = {
    id: Generated<number>;
    xPos: number;
    yPos: number;
    type: string;
    color: string;
    gameId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type Lobby = {
    id: string;
    name: string;
    password: string | null;
    maxPlayers: Generated<number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type LobbyMember = {
    id: Generated<number>;
    lobbyId: string;
    userId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type User = {
    id: string;
    username: string;
    email: string;
    password: string | null;
    role: Generated<Role>;
    blocked: Generated<boolean>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    ChatMessage: ChatMessage;
    Game: Game;
    GameMove: GameMove;
    GamePiece: GamePiece;
    Lobby: Lobby;
    LobbyMember: LobbyMember;
    User: User;
};
