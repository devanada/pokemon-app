import React, { useState, useMemo, useEffect } from "react";
import type { AppProps } from "next/app";

import { ThemeContext } from "utils/context";
import "styles/globals.css";
import "styles/layout.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>("dark");
  const mode = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={mode}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
