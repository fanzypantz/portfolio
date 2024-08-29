export const Role = {
    admin: "admin",
    user: "user",
    guest: "guest"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
