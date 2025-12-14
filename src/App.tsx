import { useEffect, useState } from "react";
import {ThemaContext} from "./contex/ThemaContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Proyectos from "./pages/Proyectos";
import Skills from "./pages/Skill";
import Contacto from "./pages/Contactos";
import Footer from "./components/Footer";

function App() {

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });


  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };


  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white min-h-screen transition-colors duration-300">
      
      {/* NAVBAR */}
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />

      <main>
        {/* HOME */}
        <Home />

        {/* SOBRE MI */}
        <AboutMe />

        {/* PROYECTOS */}
        <section id="proyectos" className="pt-32 min-h-screen">
          <Proyectos />
        </section>

        {/* SKILLS */}
        <section id="skills" className="pt-32 min-h-screen">
          <Skills />
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="pt-32 min-h-screen">
          <Contacto />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
