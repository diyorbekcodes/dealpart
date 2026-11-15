"use client";

import { useEffect, useState } from "react";

export function useHasSession() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const read = () => {
      setHasSession(!!localStorage.getItem("crmAccessToken"));
    };

    read();
    window.addEventListener("auth-change", read);
    window.addEventListener("storage", read);

    return () => {
      window.removeEventListener("auth-change", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return hasSession;
}
