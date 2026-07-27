import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Globe } from "lucide-react";

/* ====== TYPES ====== */
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string; // Opcionales por seguridad
  live?: string;
}

/* ====== DATA (Idealmente en archivo separado) ====== */
const projectData: Project[] = [
  {
    id: "lla-puan",
    title: "Página LLA - Distrito Puan",
    description:
      "Sitio diseñado para centralizar la comunicación de campaña de LLA en el distrito.",
    tags: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Fausto-Desch/PaginaLLADistritoPuan.git",
    live: "https://lla-distrito-puan.vercel.app/",
  },
  {
    id: "portafolio-heit",
    title: "Portafolio Julian Heit",
    description:
      "Desarrollo de portafolio personal para exhibición de proyectos y habilidades.",
    tags: ["React", "Vite", "Tailwind CSS", "UI/UX"],
    github: "https://github.com/Fausto-Desch/PortafolioPato.git",
    live: "https://portafolio-five-delta-26.vercel.app/",
  },
  {
    id: "gestion-canchas",
    title: "Plataforma de Gestión de Canchas",
    description:
      "Sistema integral que permite a usuarios reservar turnos y a administradores gestionar clubes, agendas y precios.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/Fausto-Desch/Proyecto-Final.git",
    live: "https://proyecto-final-frontend-one-beta.vercel.app/presentacion",
  },
  {
    id: "Soultone-Canto-Landing-Page",
    title: "Soultone Canto - Landing Page",
    description:
      "Pagina para la reserva de clases de canto, con diseño responsivo y animaciones suaves.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    live: "https://soultone-canto-landing-page.vercel.app/",
  },
  {
    id: "Innova-Landing-Page",
    title: "Innova - Landing Page",
    description: "Pagina de presentación para la empresa Innova.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    live: "https://innova-landing-kappa.vercel.app/",
  },
  {
    id: "Sistema de Stock",
    title: "Dietetica",
    description: "Sistema de gestión de stock para la Dietetica.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    live: "https://suelto-y-natural-sistema-front-end.vercel.app/login",
  },
];

/* ====== ANIMATION VARIANTS ====== */
const tagContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const tagItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/* ====== LIVE PREVIEW (hover) ======
   Muestra una miniatura "en vivo" del sitio dentro de un iframe escalado.
   Nota: algunos hosts pueden enviar cabeceras (X-Frame-Options / CSP
   frame-ancestors) que bloquean el iframe. Vercel no lo hace por defecto,
   así que debería andar bien con estos links. Si algún sitio no carga,
   cae de forma prolija en el placeholder de <Globe />.
*/
function LivePreview({ url, title }: { url: string; title: string }) {
  return (
    <div className="absolute inset-0 origin-top-left w-[400%] h-[400%] scale-[0.25] pointer-events-none">
      <iframe
        src={url}
        title={`Preview de ${title}`}
        loading="lazy"
        tabIndex={-1}
        className="w-full h-full border-0"
      />
    </div>
  );
}

/* ====== CARRUSEL: hook con scroll nativo + snap ======
   Usa scroll horizontal nativo (con snap) en vez de reimplementar la
   física del drag: más liviano, funciona con touch/trackpad gratis, y un
   IntersectionObserver detecta qué card está activa para sincronizar los
   puntos indicadores.
*/
function useCarousel(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [itemCount]);

  const scrollToIndex = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const firstCard = cardRefs.current[0];
    if (!track || !firstCard) return;
    const gap = 32; // gap-8
    const step = firstCard.getBoundingClientRect().width + gap;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return { trackRef, cardRefs, activeIndex, scrollToIndex, scrollByCard };
}

/* ====== PROJECT CARD COMPONENT ====== */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);

  // Glow que sigue al cursor, vía CSS custom properties (--x, --y)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = articleRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={articleRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 1.11, 0.81, 0.99] }}
      viewport={{ once: true, amount: 0.4 }}
      className="
        group relative h-full p-7 rounded-3xl flex flex-col justify-between
        bg-white dark:bg-slate-900
        border border-slate-100 dark:border-slate-800/50
        shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10
        hover:-translate-y-2 hover:scale-[1.02]
        transition-all duration-300 ease-in-out
        overflow-hidden
      "
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Número de fondo (signature element) */}
      <span
        aria-hidden="true"
        className="
          absolute -top-4 -right-2 text-8xl font-black select-none pointer-events-none
          text-indigo-500/5 dark:text-indigo-400/[0.07]
          group-hover:text-indigo-500/10 dark:group-hover:text-indigo-400/[0.12]
          transition-colors duration-300
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Glow que sigue el cursor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
        style={{
          background:
            "radial-gradient(400px circle at var(--x) var(--y), rgba(99,102,241,0.10), transparent 70%)",
        }}
      />

      {/* Borde resaltado en hover */}
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-indigo-500/20 rounded-3xl transition-colors duration-300" />

      {/* CONTENT */}
      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-2xl font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>

          {/* Link secundario a GitHub, solo si el repo es público */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver código fuente de ${project.title} en GitHub`}
              className="
                shrink-0 mt-1 p-2 rounded-full
                text-slate-400 hover:text-indigo-600
                dark:text-slate-500 dark:hover:text-indigo-400
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition-colors
              "
            >
              <Github size={20} />
            </a>
          )}
        </div>

        {/* PREVIEW EN VIVO (fade/scale a foco en hover) */}
        <div
          className="
            relative mb-5 rounded-2xl overflow-hidden aspect-video
            bg-slate-100 dark:bg-slate-800
            border border-slate-200 dark:border-slate-800
          "
        >
          {project.live ? (
            <>
              <div
                className="
                  absolute inset-0 transition-all duration-500 ease-out
                  grayscale opacity-60 blur-[1px] scale-[1.03]
                  group-hover:grayscale-0 group-hover:opacity-100 group-hover:blur-0 group-hover:scale-100
                "
              >
                <LivePreview url={project.live} title={project.title} />
              </div>
              {/* Velo para que no compita con el texto de abajo mientras no hay hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-slate-900/10 pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700">
              <Globe size={32} />
            </div>
          )}
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-5 text-sm/relaxed">
          {project.description}
        </p>

        {/* TAGS con stagger */}
        <motion.div
          className="flex flex-wrap gap-2 mb-7"
          variants={tagContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagItemVariants}
              className="
                text-xs font-semibold px-3 py-1.5 rounded-full
                bg-slate-100 text-slate-700
                dark:bg-indigo-500/10 dark:text-indigo-300
                border border-slate-200 dark:border-indigo-500/20
                transition-colors
              "
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* LINK (Estilizado como botón único) */}
      <div className="relative pt-5 border-t border-slate-100 dark:border-slate-800/80">
        {project.live && (
          <motion.a
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.03 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.97 }}
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar sitio en vivo de ${project.title}`}
            className="
              w-full flex items-center justify-center gap-2
              text-sm font-medium px-4 py-2.5 rounded-xl
              bg-indigo-600 text-white
              hover:bg-indigo-700
              dark:bg-indigo-500/10 dark:text-indigo-300
              dark:hover:bg-indigo-500/20
              transition-colors duration-200
            "
          >
            <ExternalLink size={18} /> Ver página
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

/* ====== CARRUSEL DE PROYECTOS ====== */
function ProjectsCarousel() {
  const { trackRef, cardRefs, activeIndex, scrollToIndex, scrollByCard } =
    useCarousel(projectData.length);

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Proyecto anterior"
        className="
          hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10
          items-center justify-center w-11 h-11 rounded-full
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          text-slate-600 dark:text-slate-300
          shadow-md hover:text-indigo-600 dark:hover:text-indigo-400
          hover:border-indigo-300 dark:hover:border-indigo-500/40
          transition-colors
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={() => scrollByCard(1)}
        aria-label="Siguiente proyecto"
        className="
          hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10
          items-center justify-center w-11 h-11 rounded-full
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          text-slate-600 dark:text-slate-300
          shadow-md hover:text-indigo-600 dark:hover:text-indigo-400
          hover:border-indigo-300 dark:hover:border-indigo-500/40
          transition-colors
        "
      >
        <ChevronRight size={20} />
      </button>

      {/* Track con scroll nativo + snap */}
      <div
        ref={trackRef}
        className="
          flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth
          pb-4 -mx-1 px-1
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {projectData.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[46%] lg:w-[31.5%]"
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-8">
        {projectData.map((project, index) => (
          <button
            key={project.id}
            onClick={() => scrollToIndex(index)}
            aria-label={`Ir al proyecto ${index + 1}: ${project.title}`}
            className={`
              h-2 rounded-full transition-all duration-300
              ${
                activeIndex === index
                  ? "w-6 bg-indigo-600 dark:bg-indigo-500"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}

/* ====== MAIN PAGE COMPONENT ====== */
export default function Proyectos() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="proyectos"
      className="
        min-h-screen py-28 px-6
        bg-slate-50 dark:bg-slate-950
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -20,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="
              text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter
              text-slate-950 dark:text-white
              mb-4
            "
          >
            Mi <span className="text-indigo-600 dark:text-indigo-500">Portafolio</span>
          </motion.h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes, enfocados en performance,
            usabilidad y código limpio.
          </p>
        </motion.div>

        {/* CARRUSEL */}
        <ProjectsCarousel />

        {/* CALL TO ACTION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
        >
          <p className="text-slate-700 dark:text-slate-300 mb-1">
            ¿Querés explorar más?
          </p>
          <motion.a
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            href="https://github.com/Fausto-Desch" // Reemplazar por tu perfil real
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-lg font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
          >
            Visitá mi GitHub para ver otros repositorios →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}