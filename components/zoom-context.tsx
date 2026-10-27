
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ZoomContextType = {
  zoom: number;
  setZoom: (zoom: number) => void;
  resetZoom: () => void;
};

const ZoomContext = createContext<ZoomContextType | null>(null);

export function ZoomProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [zoom, setZoom] = useState(1);

  function resetZoom() {
    setZoom(1);
  }

  return (
    <ZoomContext.Provider
      value={{ zoom, setZoom, resetZoom }}
    >
      {children}
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  const context = useContext(ZoomContext);

  if (!context) {
    throw new Error(
      "useZoom must be used inside ZoomProvider"
    );
  }

  return context;
}
