import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
  //     if (typeof window !== "undefined") {
  //       const stored = localStorage.getItem("isSidebarOpen");
  //       return stored ? JSON.parse(stored) : true;
  //     }
  //     return true;
  //   });
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first
      const stored = localStorage.getItem("isSidebarOpen");
      if (stored) return JSON.parse(stored);

      // Default based on screen width
      return window.innerWidth >= 768; // open if width >= 768px, closed otherwise
    }
    return true; // default for SSR
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev: boolean) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("isSidebarOpen", JSON.stringify(newState));
      }
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

export default SidebarContextProvider;
