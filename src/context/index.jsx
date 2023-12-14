import { useContext, createContext } from "react";

export const themeContext = createContext();
export const useTheme = () => useContext(themeContext);

export const tasksContext = createContext();
export const useTasks = () => useContext(tasksContext);
