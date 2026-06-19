"use client";

import { useState, useCallback } from "react";

export type IntroState = "visible" | "fading" | "done";

export function useIntro() {
  const [state, setState] = useState<IntroState>("visible");

  const enter = useCallback(() => {
    setState("fading");
    setTimeout(() => {
      setState("done");
      window.scrollTo({ top: 0 });
    }, 1000);
  }, []);

  return { state, enter };
}
