"use client";

import { createContext, useContext, useState } from "react";

type UserData = {
  name: string;
  title: string;
  supervisor: string;
  email: string;
  scribe1: string;
  scribe2: string;
  scribe3: string;
  scribe4: string;
  scribe5: string;
  scribe6: string;
  scribe7: string;
  completedIsoModule: boolean;
  currentSlideDeck: string;
  enteredIsoModule: boolean;
};

type AppContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    title: "",
    supervisor: "",
    email: "",
    scribe1: "",
    scribe2: "",
    scribe3: "",
    scribe4: "",
    scribe5: "",
    scribe6: "",
    scribe7: "",
    completedIsoModule: false,
    currentSlideDeck: "policies",
    enteredIsoModule: false
  });

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside an AppProvider");
  }

  return context;
}
