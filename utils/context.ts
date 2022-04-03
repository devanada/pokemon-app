import { createContext } from "react";

type theme = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<theme>({
  theme: "light",
  setTheme: () => {},
});
