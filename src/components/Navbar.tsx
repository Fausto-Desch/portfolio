import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Send } from "lucide-react";

/* ====== TYPES ====== */
interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "#home", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Skills" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  // Manejo de Scroll con throttle natural
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inicialización de Tema (Evita inconsistencias)
  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 md:px-6 transition-all duration-500 flex items-center justify-between
          ${
            scrolled
              ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-indigo-500/5 rounded-3xl py-3"
              : "bg-transparent border-transparent py-2"
          }
        `}
      >
        {/* LOGO */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-cyan-400">
            Fausto
          </span>
          <span className="text-slate-800 dark:text-slate-200 group-hover:translate-x-1 transition-transform duration-300">
            Dev
          </span>
        </motion.a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex gap-1 items-center">
          <div className="flex gap-2 mr-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all relative group"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-300"
            >
              <motion.div
                initial={false}
                animate={{ rotate: dark ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>

            <a
              href="#contacto"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
              Hablemos
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-indigo-300"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            className="p-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-24 z-40"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
              <div className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl text-lg font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                  >
                    {link.label}
                    <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-indigo-500" />
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 text-white font-bold"
                >
                  <Send size={18} />
                  Empezar un proyecto
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}