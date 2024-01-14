"use client";

import { User } from "@supabase/gotrue-js";
import { Database, Tables } from "@supabase/database.types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface UserContextInterface {
  user?: User;
  profile?: Tables<"profiles">;
}

export const UserContext = createContext({} as UserContextInterface);

export const UserProvider = ({
  children,
  user,
  profile
}: {
  children: ReactNode;
  user?: User;
  profile?: Tables<"profiles">;
}) => {
  const supabase = createClientComponentClient<Database>();
  const [userData, setUserData] = useState<User | undefined>(user);
  const [profileData, setProfileData] = useState<Tables<"profiles"> | undefined>(profile);

  useEffect(() => {
    if (userData && !profileData) {
      getProfile();
    }
  }, [userData]);

  const getProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (error) {
      console.log("error : ", error);
      throw error;
    }
    setProfileData(data);
  };

  return <UserContext.Provider value={{ user: userData, profile: profileData }}>{children}</UserContext.Provider>;
};
