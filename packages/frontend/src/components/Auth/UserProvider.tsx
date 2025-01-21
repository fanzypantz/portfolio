"use client";

import { createContext, ReactNode, useState } from "react";

import { UserSession } from "@lib/Auth/types";

export interface UserContextInterface {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
}

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

export const UserProvider = ({ children, userData }: { children: ReactNode; userData?: UserSession | null }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState<UserSession | null>(userData || null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
