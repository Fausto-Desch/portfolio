import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

/* ====== DATA ====== */
const projectData = [
  {
    title: "E-Commerce Full Stack",
    description: "Plataforma completa con autenticación, carrito y pagos.",
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    github: "https://github.com/tu-usuario/ecommerce",
    live: "https://live.ecommerce.com",
  },
  {
    title: "App de Clima en Tiempo Real",
    description: "Aplicación con datos en vivo y diseño responsive.",
    tags: ["Next.js", "TypeScript", "Tailwind", "API REST"],
    github: "https://github.com/tu-usuario/clima-app",
    live: "https://live.clima-app.com",
  },
  {
    title: "Blog Personal / CMS",
    description: "CMS headless con panel de administración.",
    tags: ["Gatsby", "GraphQL", "Strapi", "SASS"],
    github: "https://github.com/tu-usuario/blog-cms",
    live: "https://live.blog-cms.com",
  },
];

/* ====== CARD ====== */
function ProjectCard({
  project,
  index,
}: {
  project: typeof projectData[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="
        p-6 rounded-2xl flex flex-col justify-between
        bg-slate-100 dark:bg-slate-900/60
        border border-slate-200 dark:border-slate-800
        shadow-lg
        hover:-translate-y-2 hover:border-indigo-500/50
        transition-all duration-300
      "
    >
      {/* CONTENT */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-indigo-400 mb-2">
          {project.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {project.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                text-xs font-medium px-3 py-1 rounded-full
                bg-slate-200 text-slate-700
                dark:bg-slate-800 dark:text-slate-300
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* LINKS */}
      <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              text-slate-600 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-white
              transition
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
            className="
              flex items-center gap-1
              text-slate-600 dark:text-slate-400
              hover:text-indigo-600 dark:hover:text-indigo-400
              transition
            "
          >
            <ExternalLink size={18} /> Live
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ====== PAGE ====== */
export default function Proyectos() {
  return (
    <section
      id="proyectos"
      className="
        min-h-screen py-24 px-6
        bg-white dark:bg-slate-950
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            text-4xl md:text-5xl font-extrabold text-center mb-16
            text-slate-900 dark:text-white
          "
        >
          Mi <span className="text-indigo-500">Portafolio</span>
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 dark:text-slate-400">
            ¿Querés ver más? Visitá mi GitHub para explorar otros proyectos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
