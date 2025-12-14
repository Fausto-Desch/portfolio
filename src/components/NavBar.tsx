// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  // Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Leer tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  const links = [
    { href: "#home", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre Mí" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#skills", label: "Skills" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl px-6 transition-all duration-300 flex items-center justify-between
          ${
            scrolled
              ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl rounded-full py-3 mx-4 md:mx-auto mt-2"
              : "bg-transparent border-transparent"
          }
        `}
      >
        {/* LOGO */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Fausto
          <span className="text-indigo-500 dark:text-indigo-400">
            Dev
          </span>
        </a>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}

          {/* TOGGLE TEMA */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-110 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CTA */}
          <a
            href="#contacto"
            className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-transform hover:scale-105 active:scale-95"
          >
            Hablemos
          </a>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="text-slate-700 dark:text-slate-300"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 absolute top-full left-0 right-0"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-slate-700 dark:text-slate-300 hover:text-indigo-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
