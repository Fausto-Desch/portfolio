import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Send } from "lucide-react";

/* ====== TYPES ====== */
interface NavLink {
  href: string;
  label: string;
  id: string; // sin el "#", para el IntersectionObserver
}

const links: NavLink[] = [
  { href: "#home", label: "Inicio", id: "home" },
  { href: "#sobre-mi", label: "Sobre Mí", id: "sobre-mi" },
  { href: "#proyectos", label: "Proyectos", id: "proyectos" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contacto", label: "Contacto", id: "contacto" },
];

/* ====== HOOK: sección activa según el scroll ======
   Observa cada sección de la página (por id) y devuelve cuál está más
   visible ahora mismo, para resaltar el link correspondiente en la nav.
*/
function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

/* ====== HOOK: progreso de scroll de la página (0 a 100) ====== */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  const activeId = useActiveSection(links.map((l) => l.id));
  const scrollProgress = useScrollProgress();

  // Manejo de Scroll con throttle natural
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inicialización de Tema (Evita inconsistencias)
  // NOTA: esto igual puede generar un flash de tema incorrecto en el primer
  // paint, porque corre en un useEffect (después del render). Para eliminarlo
  // del todo hace falta un script inline en el <head> de tu documento
  // (layout.tsx / _document), ANTES de que React hidrate, algo así:
  //
  //   <script dangerouslySetInnerHTML={{ __html: `
  //     (function() {
  //       var t = localStorage.getItem('theme');
  //       var isDark = t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
  //       if (isDark) document.documentElement.classList.add('dark');
  //     })();
  //   `}} />
  //
  // Eso queda fuera de este componente, pero vale la pena que lo sepas.
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
        className={`relative mx-auto max-w-6xl px-4 md:px-6 transition-all duration-500 flex items-center justify-between
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
          className="group text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
            Fausto
          </span>
          <span className="text-slate-800 dark:text-slate-200 group-hover:translate-x-1 transition-transform duration-300">
            Dev
          </span>
        </motion.a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex gap-1 items-center">
          <div className="flex gap-2 mr-4">
            {links.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`px-4 py-2 text-sm font-semibold transition-all relative rounded-lg
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                    ${
                      isActive
                        ? "text-indigo-600 dark:text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white"
                    }
                  `}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-1 h-0.5 bg-indigo-500 transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Hablemos
              <Send
                size={14}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="relative p-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* BARRA DE PROGRESO DE SCROLL (borde inferior del navbar) */}
        <div className="absolute left-4 right-4 md:left-6 md:right-6 -bottom-px h-[2px] rounded-full bg-slate-200/60 dark:bg-slate-800/60 overflow-hidden pointer-events-none">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 rounded-full"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
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
                {links.map((link, i) => {
                  const isActive = activeId === link.id;
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                        ${
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                            : "text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400"
                        }
                      `}
                    >
                      {link.label}
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive
                            ? "bg-indigo-500"
                            : "bg-slate-200 dark:bg-slate-800 group-hover:bg-indigo-500"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-600 text-white font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
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