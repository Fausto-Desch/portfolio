import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <section
      id="home"
      className="
        relative min-h-screen
        flex flex-col items-center justify-center
        px-6 overflow-hidden
        bg-white dark:bg-slate-950
        transition-colors duration-300
      "
    >
      {/* ====== BACKGROUND GLOW ====== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/3 -left-1/4 w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/3 -right-1/4 w-[60%] h-[60%] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* ====== CONTENT ====== */}
      <div className="relative z-10 max-w-4xl text-center">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            inline-block mb-6 px-4 py-1.5 rounded-full
            bg-indigo-500/10 border border-indigo-500/20
            text-indigo-500 dark:text-indigo-300
            text-sm font-medium
          "
        >
          ✨ Disponible para proyectos
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-5xl md:text-7xl font-extrabold
            text-slate-900 dark:text-white
            mb-6
          "
        >
          Hola, soy{" "}
          <span className="
            text-transparent bg-clip-text
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
          ">
            Desch Fausto
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            text-xl md:text-2xl
            text-slate-600 dark:text-slate-400
            mb-10
          "
        >
          Desarrollador{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            Full Stack
          </span>{" "}
          enfocado en crear experiencias web modernas
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <a
            href="#proyectos"
            className="
              px-8 py-3 rounded-full
              bg-indigo-600 text-white
              font-semibold
              hover:bg-indigo-500
              transition
            "
          >
            Ver proyectos
          </a>

          <a
            href="#contacto"
            className="
              px-8 py-3 rounded-full
              border border-slate-300 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-800
              transition
            "
          >
            Contacto
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          <SocialLink href="https://github.com/Fausto-Desch" icon={<Github size={20} />} />
          <SocialLink href="https://www.linkedin.com/in/fausto-desch-3758a5226/" icon={<Linkedin size={20} />} />
          <SocialLink href="mailto:faudesch2210@gmail.com" icon={<Mail size={20} />} />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="
          absolute bottom-10
          text-slate-400 dark:text-slate-500
        "
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}

/* ====== SOCIAL BUTTON ====== */
function SocialLink({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        p-3 rounded-full
        bg-slate-100 dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        text-slate-600 dark:text-slate-400
        hover:text-indigo-500 hover:border-indigo-500/40
        transition
      "
    >
      {icon}
    </a>
  );
}
