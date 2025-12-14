// src/context/ThemeContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";

// Definimos el tipo para el contexto
interface ThemeContextProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Creamos el contexto con un valor inicial de undefined
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook para acceder al contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Componente que envuelve a nuestra app con el contexto
export const ThemeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Leer el tema guardado al cargar la app
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Función para alternar entre los temas
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
