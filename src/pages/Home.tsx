import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react";

export default function Home() {
  // Variantes para animaciones coordinadas
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom, ease: [0.25, 1, 0.5, 1] },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      {/* ====== BACKGROUND AMBIENCE ====== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px]" />
        {/* Sutil malla de puntos (opcional, da textura) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-multiply dark:mix-blend-overlay" />
      </div>

      {/* ====== MAIN CONTENT ====== */}
      <div className="relative z-10 max-w-5xl text-center">
        
        {/* Badge Disponibilidad */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 shadow-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          <span className="text-indigo-700 dark:text-indigo-300 text-xs md:text-sm font-bold tracking-wide uppercase">
            Disponible para nuevos desafíos
          </span>
        </motion.div>

        {/* Headline Principal */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter"
        >
          Hola, soy <br className="md:hidden" />
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400">
              Fausto Desch
            </span>
            {/* Subrayado decorativo */}
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-2 bg-indigo-500/20 rounded-full"
            />
          </span>
        </motion.h1>

        {/* Subtítulo / Intro */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Desarrollador <span className="text-slate-900 dark:text-slate-100 font-bold border-b-2 border-indigo-500/50">Full Stack</span> especializado en el ecosistema React. Transformo ideas en interfaces potentes, escalables y visualmente impactantes.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16"
        >
          <a
            href="#proyectos"
            className="group relative px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-2"
          >
            Explorar Proyectos
            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href="#contacto"
            className="px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
          >
            Hablemos
          </a>
        </motion.div>

        {/* Redes Sociales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex justify-center items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-4">
            <SocialLink href="https://github.com/Fausto-Desch" icon={<Github size={22} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/fausto-desch-3758a5226/" icon={<Linkedin size={22} />} label="LinkedIn" />
            <SocialLink href="mailto:faudesch2210@gmail.com" icon={<Mail size={22} />} label="Email" />
          </div>
          <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800" />
        </motion.div>
      </div>

      {/* Indicador de Scroll mejorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
        <ArrowDown size={20} className="text-indigo-500" />
      </motion.div>
    </section>
  );
}

/* ====== COMPONENTE SOCIAL REUTILIZABLE ====== */
function SocialLink({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      className="
        p-4 rounded-2xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        text-slate-600 dark:text-slate-400
        hover:text-indigo-600 dark:hover:text-indigo-400
        hover:border-indigo-200 dark:hover:border-indigo-500/30
        hover:shadow-xl hover:shadow-indigo-500/10
        transition-all duration-300
      "
    >
      {icon}
    </motion.a>
  );
}