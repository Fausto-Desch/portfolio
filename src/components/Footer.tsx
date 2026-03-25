import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart, Code2 } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre Mí" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#skills", label: "Skills" },
    { href: "#contacto", label: "Contacto" },
  ];

  const socialLinks = [
    { href: "https://github.com/Fausto-Desch", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/fausto-desch-3758a5226/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:faudesch2210@gmail.com", icon: Mail, label: "Email" },
  ];

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t py-16 px-6 transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/50">
      
      {/* Decoración sutil de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          
          {/* SECCIÓN LOGO Y SCROLL */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
            <motion.a
              href="#home"
              whileHover={{ x: 5 }}
              className="inline-block text-3xl font-black tracking-tighter text-slate-900 dark:text-white group"
            >
              Fausto
              <span className="text-indigo-600 dark:text-indigo-500 group-hover:text-purple-500 transition-colors">
                Dev
              </span>
            </motion.a>
            
            <p className="text-sm max-w-xs leading-relaxed">
              Desarrollador Full Stack enfocado en crear soluciones digitales de alto impacto, combinando diseño moderno y rendimiento técnico.
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-indigo-600 dark:text-indigo-400 shadow-sm hover:shadow-indigo-500/10 transition-all"
            >
              <ArrowUp size={18} /> Volver arriba
            </motion.button>
          </div>

          {/* NAVEGACIÓN RÁPIDA */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="h-[1px] w-0 bg-indigo-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* REDES SOCIALES */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
              Conectar
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <link.icon size={16} />
                    </div>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ENFOQUE (VISIBLE EN LG) */}
          <div className="hidden lg:block space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Node', 'Tailwind'].map((tech) => (
                <span key={tech} className="px-2 py-1 rounded-md bg-slate-200/50 dark:bg-slate-800 text-[10px] font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL DE COPYRIGHT */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
            &copy; {currentYear} Fausto Desch. Hecho con <Heart size={12} className="text-red-500 animate-pulse" /> en Bahía Blanca.
          </p>
          
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
             <span className="flex items-center gap-1"> <Code2 size={14} /> Full Stack Dev </span>
             <span className="w-1 h-1 rounded-full bg-slate-700" />
             <span className="hover:text-indigo-500 transition-colors cursor-default">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}