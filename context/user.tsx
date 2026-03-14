import React, { createContext, useContext, useMemo, useState } from "react";

export type UserProfile = {
  name: string;
  location: string;
  bookings: number;
};

type UserContextValue = {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
};

const defaultUser: UserProfile = {
  name: "Taylor Adams",
  location: "Boston, MA",
  bookings: 4,
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
};
