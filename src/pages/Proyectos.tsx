import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

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
    description: "Sitio diseñado para centralizar la comunicación de campaña de LLA en el distrito.",
    tags: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Fausto-Desch/PaginaLLADistritoPuan.git",
    live: "https://lla-distrito-puan.vercel.app/",
  },
  {
    id: "portafolio-heit",
    title: "Portafolio Julian Heit",
    description: "Desarrollo de portafolio personal para exhibición de proyectos y habilidades.",
    tags: ["React", "Vite", "Tailwind CSS", "UI/UX"],
    github: "https://github.com/Fausto-Desch/PortafolioPato.git",
    live: "https://portafolio-five-delta-26.vercel.app/",
  },
  {
    id: "gestion-canchas",
    title: "Plataforma de Gestión de Canchas",
    description: "Sistema integral que permite a usuarios reservar turnos y a administradores gestionar clubes, agendas y precios.",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/Fausto-Desch/Proyecto-Final.git",
    live: "https://proyecto-final-frontend-one-beta.vercel.app/presentacion",
  },
];

/* ====== PROJECT CARD COMPONENT ====== */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 1.11, 0.81, 0.99] }} // Ease out back para bounce suave
      viewport={{ once: true, amount: 0.2 }}
      className="
        group relative p-7 rounded-3xl flex flex-col justify-between
        bg-white dark:bg-slate-900
        border border-slate-100 dark:border-slate-800/50
        shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10
        hover:-translate-y-2
        transition-all duration-300 ease-in-out
        overflow-hidden
      "
    >
      {/* Efecto de resplandor de fondo en hover (Mejora visual) */}
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-indigo-500/20 rounded-3xl transition-colors duration-300" />

      {/* CONTENT */}
      <div>
        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 mb-5 text-sm/relaxed">
          {project.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                text-xs font-semibold px-3 py-1.5 rounded-full
                bg-slate-100 text-slate-700
                dark:bg-indigo-500/10 dark:text-indigo-300
                border border-slate-200 dark:border-indigo-500/20
                transition-colors
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* LINKS (Estilizados como botones) */}
      <div className="flex gap-3 pt-5 border-t border-slate-100 dark:border-slate-800/80">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver código fuente de ${project.title} en GitHub`}
            className="
              flex-1 flex items-center justify-center gap-2
              text-sm font-medium px-4 py-2.5 rounded-xl
              bg-slate-100 text-slate-800
              hover:bg-slate-200
              dark:bg-slate-800 dark:text-slate-200
              dark:hover:bg-slate-700
              transition-colors duration-200
            "
          >
            <Github size={18} /> Código
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar sitio en vivo de ${project.title}`}
            className="
              flex-1 flex items-center justify-center gap-2
              text-sm font-medium px-4 py-2.5 rounded-xl
              bg-indigo-600 text-white
              hover:bg-indigo-700
              dark:bg-indigo-500/10 dark:text-indigo-300
              dark:hover:bg-indigo-500/20
              transition-colors duration-200
            "
          >
            <ExternalLink size={18} /> Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

/* ====== MAIN PAGE COMPONENT ====== */
export default function Proyectos() {
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="
            text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter
            text-slate-950 dark:text-white
            mb-4
          ">
            Mi <span className="text-indigo-600 dark:text-indigo-500">Portafolio</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Una selección de mis trabajos más recientes, enfocados en performance, usabilidad y código limpio.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard
              key={project.id} // Mejor práctica: usar ID único
              project={project}
              index={index}
            />
          ))}
        </div>

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
          <a
            href="https://github.com/Fausto-Desch" // Remplazar por tu perfil real
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
          >
            Visitá mi GitHub para ver otros repositorios →
          </a>
        </motion.div>
      </div>
    </section>
  );
}