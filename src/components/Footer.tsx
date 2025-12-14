import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

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
    <footer
      className="
        border-t py-12 md:py-16 px-6 transition-colors duration-300
        bg-slate-100 text-slate-600 border-slate-200
        dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800
      "
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b pb-8 mb-8
          border-slate-200 dark:border-slate-800
        ">

          {/* LOGO */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a
              href="#home"
              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white group"
            >
              Fausto
              <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors">
                Dev
              </span>
            </a>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:opacity-80"
            >
              <ArrowUp size={16} /> Volver Arriba
            </motion.button>
          </div>

          {/* NAVEGACIÓN */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">
              Navegación
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* REDES */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">
              Conectar
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <link.icon size={16} /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* TEXTO EXTRA */}
          <div className="hidden lg:block lg:col-span-2">
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">
              Enfoque
            </h4>
            <p className="text-sm">
              Construcción de aplicaciones Full Stack robustas y visualmente atractivas con las mejores prácticas de la industria.
            </p>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-sm pt-4 border-t
          border-slate-200 dark:border-slate-800
        ">
          <p>
            &copy; {currentYear} FaustoDev. Diseñado y desarrollado con ❤️ y React / Tailwind.
          </p>
        </div>

      </div>
    </footer>
  );
}
