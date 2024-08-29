export const GameStatus = {
    waiting: "waiting",
    playing: "playing",
    finished: "finished"
} as const;
export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];
export const Role = {
    admin: "admin",
    user: "user",
    guest: "guest"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
