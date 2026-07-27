import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react";

/* Config rápida: cambiar acá cuando cambie tu disponibilidad, sin tocar el JSX */
const IS_AVAILABLE = true;

/* Snippet que se "tipea" en la tarjeta flotante del hero */
const CODE_SNIPPET = `const dev = {
  name: "Fausto Desch",
  stack: ["React", "Next.js", "TS"],
  status: "shipping",
};`;

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);

  // Posición del mouse relativa al centro de la sección, para el parallax
  // sutil de los blobs de fondo.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const blobOneX = useTransform(springX, [-1, 1], [-20, 20]);
  const blobOneY = useTransform(springY, [-1, 1], [-20, 20]);
  const blobTwoX = useTransform(springX, [-1, 1], [15, -15]);
  const blobTwoY = useTransform(springY, [-1, 1], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-16 md:pt-28 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      {/* ====== BACKGROUND AMBIENCE ====== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blueprint grid: le da identidad "técnica" en vez del ruido genérico */}
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(99 102 241 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(99 102 241 / 0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 100%)",
          }}
        />

        {/* Blobs con parallax sutil según la posición del mouse */}
        <motion.div
          style={{ x: blobOneX, y: blobOneY }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px]"
        />
        <motion.div
          style={{ x: blobTwoX, y: blobTwoY }}
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 dark:bg-violet-600/15 blur-[120px]"
        />
      </div>

      {/* ====== MAIN CONTENT ====== */}
      <div className="relative z-10 max-w-5xl w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="text-center lg:text-left">
          {/* Badge Disponibilidad (controlado por IS_AVAILABLE) */}
          {IS_AVAILABLE && (
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
          )}

          {/* Headline Principal */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-6xl md:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter"
          >
            Hola, soy <br className="hidden lg:block" />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
                Fausto Desch
              </span>
              {/* Subrayado decorativo */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
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
            className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed"
          >
            Desarrollador{" "}
            <span className="text-slate-900 dark:text-slate-100 font-bold border-b-2 border-indigo-500/50">
              Full Stack
            </span>{" "}
            especializado en el ecosistema React. Transformo ideas en interfaces
            potentes, escalables y visualmente impactantes.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5 mb-16"
          >
            <a
              href="#proyectos"
              className="group relative px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-2"
            >
              Explorar Proyectos
              <ExternalLink
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
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
            className="flex justify-center lg:justify-start items-center gap-4"
          >
            <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800" />
            <div className="flex gap-4">
              <SocialLink
                href="https://github.com/Fausto-Desch"
                icon={<Github size={22} />}
                label="GitHub"
                brand="github"
              />
              <SocialLink
                href="https://www.linkedin.com/in/fausto-desch-3758a5226/"
                icon={<Linkedin size={22} />}
                label="LinkedIn"
                brand="linkedin"
              />
              <SocialLink
                href="mailto:faudesch2210@gmail.com"
                icon={<Mail size={22} />}
                label="Email"
                brand="mail"
              />
            </div>
            <div className="h-[1px] w-12 bg-slate-200 dark:bg-slate-800" />
          </motion.div>
        </div>

        {/* Tarjeta flotante con "código en vivo" */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ rotate: 0, y: -6 }}
          className="hidden lg:block"
        >
          <CodeCard />
        </motion.div>
      </div>

      {/* Indicador de Scroll (más discreto, sin loop agresivo) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { delay: 1.5, repeat: Infinity, duration: 2.5 },
        }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
          Scroll
        </span>
        <ArrowDown size={20} className="text-indigo-500" />
      </motion.div>
    </section>
  );
}

/* ====== TARJETA DE CÓDIGO (signature element del hero) ====== */
function CodeCard() {
  const lines = CODE_SNIPPET.split("\n");

  return (
    <div
      className="
        relative rounded-2xl overflow-hidden
        bg-slate-900 dark:bg-slate-900
        border border-slate-800
        shadow-2xl shadow-indigo-500/10
      "
    >
      {/* Barra superior estilo terminal */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-amber-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-slate-400 font-mono">hero.ts</span>
      </div>

      {/* Código con reveal tipo "typing" línea por línea */}
      <pre className="p-6 text-sm md:text-[15px] font-mono leading-relaxed overflow-x-auto">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ delay: 1 + i * 0.25, duration: 0.5 }}
            className="whitespace-pre overflow-hidden text-indigo-300"
          >
            <span className="text-slate-500 select-none mr-3">{i + 1}</span>
            <CodeLine text={line} />
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

/* Colorea de forma simple claves/strings para que se vea a "código real" */
function CodeLine({ text }: { text: string }) {
  const parts = text.split(/("(?:[^"\\]|\\.)*")/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('"') ? (
          <span key={i} className="text-emerald-400">
            {part}
          </span>
        ) : (
          <span key={i} className="text-slate-300">
            {part}
          </span>
        )
      )}
    </>
  );
}

/* ====== COMPONENTE SOCIAL REUTILIZABLE ====== */
const BRAND_HOVER_CLASSES = {
  github:
    "hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600",
  linkedin:
    "hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-200 dark:hover:border-sky-500/30",
  mail: "hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30",
} as const;

function SocialLink({
  href,
  icon,
  label,
  brand,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  brand: keyof typeof BRAND_HOVER_CLASSES;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      className={`
        p-4 rounded-2xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        text-slate-600 dark:text-slate-400
        hover:shadow-xl hover:shadow-indigo-500/10
        transition-all duration-300
        ${BRAND_HOVER_CLASSES[brand]}
      `}
    >
      {icon}
    </motion.a>
  );
}